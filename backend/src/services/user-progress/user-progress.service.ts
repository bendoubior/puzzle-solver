import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { UserProgress } from 'src/interfaces/user-progress.interface';
import { PuzzleActionsService } from '../puzzle-actions/puzzle-actions.service';

@Injectable()
export class UserProgressService {
    constructor(private puzzleActions: PuzzleActionsService) {}

    public GetInitialUserProgress(initialState: number[][]): UserProgress {
        return {
            currentState: initialState,
            currentStepIndex: 0,
            numberOfCompletedSteps: 0,
        } as UserProgress;
    }

    public ProgressUserToNextState(puzzle: Puzzle): Puzzle {
        puzzle.userProgress.currentState = this.puzzleActions.SwitchPointWithXPoint(
            puzzle.userProgress.currentState,
            puzzle.steps[puzzle.userProgress.currentStepIndex],
        );
        if (puzzle.userProgress.currentStepIndex == puzzle.userProgress.numberOfCompletedSteps)
            puzzle.userProgress.numberOfCompletedSteps += 1;
        puzzle.userProgress.currentStepIndex += 1;
        return puzzle;
    }

    public ProgressUserToPreviousState(puzzle: Puzzle): Puzzle {
        if (puzzle.userProgress.currentStepIndex == 1) puzzle.userProgress.currentState = puzzle.initialState;
        else
            puzzle.userProgress.currentState = this.puzzleActions.SwitchPointWithXPoint(
                puzzle.userProgress.currentState,
                puzzle.steps[puzzle.userProgress.currentStepIndex - 2],
            );
        puzzle.userProgress.currentStepIndex = puzzle.userProgress.currentStepIndex - 1;
        return puzzle;
    }

    public ProgressUserToInitialState(puzzle: Puzzle): Puzzle {
        puzzle.userProgress.currentState = puzzle.initialState;
        puzzle.userProgress.currentStepIndex = 0;
        return puzzle;
    }

    public ProgressUserToFinalState(puzzle: Puzzle): Puzzle {
        puzzle.userProgress.currentState = puzzle.finalState;
        puzzle.userProgress.currentStepIndex = puzzle.totalSteps;
        return puzzle;
    }
}

