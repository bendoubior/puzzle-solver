import { Point } from './point.interface';
import { UserProgress } from './user-progress.interface';

export interface Puzzle {
    id: number;
    initialState: number[][];
    finalState: number[][];
    steps: Point[];
    totalSteps: number;
    userProgress: UserProgress;
}
