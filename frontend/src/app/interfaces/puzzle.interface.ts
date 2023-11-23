export interface Puzzle {
    id: number
    initialState: number[][];
    finalState: number[][];
    totalSteps: number;
    currentState: number[][];
    completedSteps: Step[];
    numberOfCompletedSteps: number;
}

export enum Step {
    Right=0,
    Left=1,
    Up=2,
    Down=3,
}