import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { UserProgress } from 'src/interfaces/user-progress.interface';

@Injectable()
export class UserProgressService {
    public GetInitialUserProgress(initialState: number[][]): UserProgress {
        return {
            currentState: initialState,
            currentStepIndex: 0,
            numberOfCompletedSteps: 0
        } as UserProgress;
    }
}
