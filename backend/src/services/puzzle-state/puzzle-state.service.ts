import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { PuzzleActionsService } from '../puzzle-actions/puzzle-actions.service';
import { UserProgressService } from '../user-progress/user-progress.service';

@Injectable()
export class PuzzleStateService {
    constructor(
        private dbService: AbstractDbService,
        private puzzleActions: PuzzleActionsService,
        private userProgressService: UserProgressService,
    ) {}

    public GetPuzzle(id: number): Promise<Puzzle> {
        return this.dbService.FindOne(id);
    }

    public DeletePuzzle(id: number): Promise<void> {
        return this.dbService.DeleteOne(id);
    }

    public async CheckStep(id: number, stepIndex: number, step: Point): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if (stepIndex != puzzle.userProgress.currentStepIndex) return;
        if (!this.puzzleActions.ArePointsEqual(puzzle.steps[stepIndex], step)) return;

        puzzle = this.userProgressService.ProgressUserToNextState(puzzle);

        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveStepForward(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if (puzzle.userProgress.currentStepIndex >= puzzle.totalSteps) return;
        puzzle = this.userProgressService.ProgressUserToNextState(puzzle);
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveStepBack(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if (puzzle.userProgress.currentStepIndex == 0) return;
        puzzle = this.userProgressService.ProgressUserToPreviousState(puzzle);
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveToInitialState(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        puzzle = this.userProgressService.ProgressUserToInitialState(puzzle);
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveToFinalState(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if (puzzle.userProgress.numberOfCompletedSteps != puzzle.totalSteps) return;
        puzzle = this.userProgressService.ProgressUserToFinalState(puzzle);
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public ExecuteStep(state: number[][], step: Point): number[][] {
        return this.puzzleActions.SwitchPointWithXPoint(state, step);
    }
}

