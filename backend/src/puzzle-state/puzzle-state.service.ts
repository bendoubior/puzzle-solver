import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export class PuzzleStateService {
    constructor(private dbService: AbstractDbService) {}

    public GetPuzzle(id: number): Promise<Puzzle> {
        return this.dbService.FindOne(id);
    }

    public DeletePuzzle(id: number): Promise<void> {
        return this.dbService.DeleteOne(id);
    }

    public async CheckStep(id: number, stepIndex: number, step: Point): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if(stepIndex != puzzle.userProgress.currentStepIndex ) return;
        if(JSON.stringify(puzzle.steps[stepIndex]) !== JSON.stringify(step)) return;
        
        puzzle.userProgress.currentState = this.ExecuteStep(puzzle.userProgress.currentState, puzzle.steps[puzzle.userProgress.currentStepIndex]);
        if(puzzle.userProgress.currentStepIndex == puzzle.userProgress.numberOfCompletedSteps) puzzle.userProgress.numberOfCompletedSteps += 1;
        puzzle.userProgress.currentStepIndex += 1;

        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveStepForward(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if(puzzle.userProgress.currentStepIndex >= puzzle.totalSteps) return;
        puzzle.userProgress.currentState = this.ExecuteStep(puzzle.userProgress.currentState, puzzle.steps[puzzle.userProgress.currentStepIndex]);
        puzzle.userProgress.currentStepIndex = puzzle.userProgress.currentStepIndex + 1;
        this.dbService.FindOneAndUpdate(id, puzzle);
    }
    
    public async MoveStepBack(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if(puzzle.userProgress.currentStepIndex <= 0) return;
        if(puzzle.userProgress.currentStepIndex == 1) puzzle.userProgress.currentState = puzzle.initialState;
        else puzzle.userProgress.currentState = this.ExecuteStep(puzzle.userProgress.currentState, puzzle.steps[puzzle.userProgress.currentStepIndex - 2]);
        puzzle.userProgress.currentStepIndex = puzzle.userProgress.currentStepIndex - 1;
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveToInitialState(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        puzzle.userProgress.currentState = puzzle.initialState;
        puzzle.userProgress.currentStepIndex = 0;
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public async MoveToFinalState(id: number): Promise<void> {
        let puzzle = await this.dbService.FindOne(id);
        if(puzzle.userProgress.numberOfCompletedSteps != puzzle.totalSteps) return;
        puzzle.userProgress.currentState = puzzle.finalState;
        puzzle.userProgress.currentStepIndex = puzzle.totalSteps;
        this.dbService.FindOneAndUpdate(id, puzzle);
    }

    public ExecuteStep(state: number[][], step: Point): number[][] {   
        const xPosition = this.findPositionOfMissingPiece(state);
        if(!xPosition) return state;
        this.replacePosition(state, xPosition, step);
        return state;
    }
    
    private replacePosition(state: number[][], piece1: Point, piece2: Point): number[][] {
        const temp = state[piece1.row][piece1.column];
        state[piece1.row][piece1.column] = state[piece2.row][piece2.column];
        state[piece2.row][piece2.column] = temp;
        return state;
    }

    private findPositionOfMissingPiece(state: number[][]): Point {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if(state[i][j] == 0) return {
                    row: i,
                    column: j
                } as Point;
            }
        }
        return null;
    }
}
