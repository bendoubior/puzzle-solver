import { Injectable } from '@angular/core';
import { PuzzleStateFacade } from '../facades/puzzle-state.facade';
import { Observable, map } from 'rxjs';
import { Point } from '../interfaces/point.interface';
import { Puzzle } from '../interfaces/puzzle.interface';

@Injectable({
    providedIn: 'root',
})
export class PuzzleNeigborsService {
    public GetXNeighborsFromPuzzle$(puzzle$: Observable<Puzzle>): Observable<Point[]> {
        return puzzle$.pipe(
            map((puzzle: Puzzle) => {
                if (!puzzle) return [];
                const xPosition = this.getXPosition(puzzle.userProgress.currentState);
                return this.getXNeigbors(puzzle.userProgress.currentState, xPosition);
            }),
        );
    }

    private getXPosition(state: number[][]): Point {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[0].length; j++) {
                if (state[i][j] == 0) return { row: i, column: j } as Point;
            }
        }
        return null;
    }

    private getXNeigbors(state: number[][], xPosition: Point): Point[] {
        let neigbors: Point[] = [];
        if (xPosition.row < state.length - 1) neigbors.push({ row: xPosition.row + 1, column: xPosition.column } as Point);
        if (xPosition.row > 0) neigbors.push({ row: xPosition.row - 1, column: xPosition.column } as Point);
        if (xPosition.column < state[0].length - 1) neigbors.push({ row: xPosition.row, column: xPosition.column + 1 } as Point);
        if (xPosition.column > 0) neigbors.push({ row: xPosition.row, column: xPosition.column - 1 } as Point);
        return neigbors;
    }
}

