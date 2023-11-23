import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { Puzzle, Step } from 'src/interfaces/puzzle.interface';

@Injectable()
export class GeneratePuzzlesService {

    public GenerateBfs(row: number, column: number): Puzzle {
        const puzzle = {
            id: 1,
            initialState: [[1,2],[0,3]],
            finalState: [[1,2],[3,0]],
            steps: [Step.Right],
            totalSteps: 1
        } as Puzzle;
        return {
            ...puzzle,
            currentState: puzzle.initialState,
            completedSteps: [],
            numberOfCompletedSteps: 0
        } as Puzzle;
    }

    public GenerateDfs(row: number, column: number): Puzzle {
        const puzzle = {
            id: 1,
            initialState: [[1,2],[0,3]],
            finalState: [[1,2],[3,0]],
            steps: [Step.Right],
            totalSteps: 1
        } as Puzzle;
        return {
            ...puzzle,
            currentState: puzzle.initialState,
            completedSteps: [],
            numberOfCompletedSteps: 0
        } as Puzzle;
    }
}
