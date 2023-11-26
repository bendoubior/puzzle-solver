import { Injectable } from '@nestjs/common';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { GenerateMatrixService } from '../generate-matrix/generate-matrix.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { ConfigService } from '@nestjs/config';
import { PuzzleActionsService } from '../puzzle-actions/puzzle-actions.service';

@Injectable()
export class GeneratePuzzlesService {
    private generatePuzzleMaxAttempts: number;

    constructor(
        private generateMatrixService: GenerateMatrixService,
        private userProgressService: UserProgressService,
        private puzzleActionsService: PuzzleActionsService,
        private readonly configService: ConfigService,
    ) {
        this.generatePuzzleMaxAttempts = this.configService.get<number>('generatePuzzleMaxAttempts');
    }

    public GenerateBfs(rows: number, columns: number): Puzzle {
        const finalState = this.generateMatrixService.GenerateFinalMatrix(rows, columns);

        for (let i = 0; i < this.generatePuzzleMaxAttempts; i++) {
            const initialState = this.generateMatrixService.GenerateRandomMatrix(rows, columns);
            const steps = this.getStepsBfs(initialState, finalState);

            if (steps)
                return {
                    initialState: initialState,
                    finalState: finalState,
                    steps: steps,
                    totalSteps: steps.length,
                    userProgress: this.userProgressService.GetInitialUserProgress(initialState),
                } as Puzzle;
        }

        return null;
    }

    public GenerateDfs(rows: number, columns: number): Puzzle {
        const finalState = this.generateMatrixService.GenerateFinalMatrix(rows, columns);

        for (let i = 0; i < this.generatePuzzleMaxAttempts; i++) {
            const initialState = this.generateMatrixService.GenerateRandomMatrix(rows, columns);
            let visited = new Set<string>();
            visited.add(JSON.stringify(JSON.parse(JSON.stringify(initialState))));
            const steps = this.getStepsDfs(initialState, finalState, visited);

            if (steps)
                return {
                    initialState: initialState,
                    finalState: finalState,
                    steps: steps,
                    totalSteps: steps.length,
                    userProgress: this.userProgressService.GetInitialUserProgress(initialState),
                } as Puzzle;
        }

        return null;
    }

    private getStepsBfs(initialState: number[][], finalState: number[][]): Point[] {
        const queue: { state: number[][]; path: Point[] }[] = [];
        const visited: Set<string> = new Set();

        queue.push({ state: initialState, path: [] });
        visited.add(JSON.stringify(initialState));

        while (queue.length > 0) {
            const { state, path } = queue.shift()!;
            if (this.puzzleActionsService.AreMatrixesEqual(state, finalState)) return path;

            const emptyPos = this.puzzleActionsService.GetXPointByValue(state);
            if (!emptyPos) continue;

            const neighbors = this.puzzleActionsService.GetPointNeighbors(state, emptyPos);

            for (const neighbor of neighbors) {
                const newState = this.puzzleActionsService.SwitchPointsPositions(JSON.parse(JSON.stringify(state)), emptyPos, neighbor);
                const key = JSON.stringify(newState);

                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push({ state: newState, path: [...path, neighbor] });
                }
            }
        }

        return null;
    }

    private getStepsDfs(currentState: number[][], finalState: number[][], visited: Set<string>, path: Point[] = []): Point[] {
        if (this.puzzleActionsService.AreMatrixesEqual(currentState, finalState)) return path;

        const emptyPos = this.puzzleActionsService.GetXPointByValue(currentState);
        if (!emptyPos) return null;

        const neighbors = this.puzzleActionsService.GetPointNeighbors(currentState, emptyPos);

        for (const neighbor of neighbors) {
            const newState = this.puzzleActionsService.SwitchPointsPositions(JSON.parse(JSON.stringify(currentState)), emptyPos, neighbor);
            const key = JSON.stringify(newState);

            if (!visited.has(key)) {
                visited.add(key);
                const solution = this.getStepsDfs(newState, finalState, visited, [...path, neighbor]);

                if (solution !== null) {
                    return solution;
                }
            }
        }

        return null;
    }
}
