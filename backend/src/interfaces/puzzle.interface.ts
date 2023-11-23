import { Point } from "./point.interface";

export interface Puzzle {
    id: number
    initialState: number[][];
    finalState: number[][];
    steps: Point[];
    totalSteps: number;
    currentState: number[][];
    completedSteps: Point[];
    numberOfCompletedSteps: number;
}