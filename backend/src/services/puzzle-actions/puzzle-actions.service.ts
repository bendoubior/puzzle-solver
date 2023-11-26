import { Injectable } from '@nestjs/common';
import { Point } from 'src/interfaces/point.interface';

@Injectable()
export class PuzzleActionsService {
    public ArePointsEqual(point1: Point, point2: Point): boolean {
        return JSON.stringify(point1) === JSON.stringify(point2);
    }

    public AreMatrixesEqual(matrix1: number[][], matrix2: number[][]): boolean {
        return JSON.stringify(matrix1) === JSON.stringify(matrix2);
    }

    public GetXPointByValue(matrix: number[][]): Point {
        return this.getPointByValue(matrix, 0);
    }

    public GetPointNeighbors(matrix: number[][], point: Point): Point[] {
        const directions: Point[] = [
            { row: -1, column: 0 }, // Up
            { row: 1, column: 0 }, // Down
            { row: 0, column: -1 }, // Left
            { row: 0, column: 1 }, // Right
        ];

        const neighbors: Point[] = [];

        for (const dir of directions) {
            const newRow = point.row + dir.row;
            const newCol = point.column + dir.column;
            if (this.isValidMove(matrix, newRow, newCol)) {
                neighbors.push({ row: newRow, column: newCol });
            }
        }

        return neighbors;
    }

    public SwitchPointsPositions(matrix: number[][], point1: Point, point2: Point): number[][] {
        [matrix[point1.row][point1.column], matrix[point2.row][point2.column]] = [
            matrix[point2.row][point2.column],
            matrix[point1.row][point1.column],
        ];
        return matrix;
    }

    public SwitchPointWithXPoint(matrix: number[][], step: Point): number[][] {
        const xPosition = this.GetXPointByValue(matrix);
        return this.SwitchPointsPositions(matrix, xPosition, step);
    }

    private isValidMove(matrix: number[][], row: number, col: number): boolean {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
        return row >= 0 && row < numRows && col >= 0 && col < numCols && matrix[row][col] !== 0;
    }

    private getPointByValue(matrix: number[][], value: number): Point | undefined {
        // Find the position of the empty piece in the current state
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] === value) {
                    return { row: i, column: j };
                }
            }
        }
        return undefined;
    }
}

