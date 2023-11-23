import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export class GeneratePuzzlesService {

    public GenerateBfs(rows: number, columns: number): Puzzle {
        const initialState = [[2,3],[1,0]];
        const finalState = this.generateFinalMatrix(rows, columns);
        const steps = this.getStepsBfs(initialState, finalState);
        return {
            initialState: initialState,
            finalState: finalState,
            steps: steps,
            totalSteps: steps.length,
            currentState: initialState,
            completedSteps: [],
            numberOfCompletedSteps: 0
        } as Puzzle;
    }

    public GenerateDfs(rows: number, columns: number): Puzzle {
        const initialState = [[2,3],[1,0]];
        const finalState = this.generateFinalMatrix(rows, columns);
        let visited = new Set<string>();
        visited.add(JSON.stringify(JSON.parse(JSON.stringify(initialState))));
        const steps = this.getStepsDfs(initialState, finalState, visited);
        return {
            initialState: initialState,
            finalState: finalState,
            steps: steps,
            totalSteps: steps.length,
            currentState: initialState,
            completedSteps: [],
            numberOfCompletedSteps: 0
        } as Puzzle;
    }

    private generateRandomMatrix(rows: number, columns: number): number[][] {
        const matrix: number[][] = [];

        // Fill the matrix with numbers from 1 to rows*cols
        const totalNumbers = rows * columns;
        const numbers: number[] = Array.from({ length: totalNumbers }, (_, index) => index);
      
        // Shuffle the numbers array
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
      
        // Populate the matrix with shuffled numbers
        for (let i = 0; i < rows; i++) {
          matrix.push(numbers.slice(i * columns, (i + 1) * columns));
        }
      
        return matrix;
    }

    private generateFinalMatrix(rows: number, columns: number): number[][] {
        const matrix: number[][] = [];

        // Fill the matrix with numbers from 1 to rows*cols
        const totalNumbers = rows * columns;
        const numbers: number[] = Array.from({ length: totalNumbers }, (_, index) => index + 1);
        numbers[numbers.length - 1] = 0;

        // Populate the matrix with the numbers
        for (let i = 0; i < rows; i++) {
          matrix.push(numbers.slice(i * columns, (i + 1) * columns));
        }
      
        return matrix;
    }

    private isValidMove(matrix: number[][], row: number, col: number): boolean {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
        return row >= 0 && row < numRows && col >= 0 && col < numCols && matrix[row][col] !== 0;
      }
      
      private getNeighbors(matrix: number[][], row: number, col: number): Point[] {
        const directions: Point[] = [
          { row: -1, column: 0 }, // Up
          { row: 1, column: 0 },  // Down
          { row: 0, column: -1 }, // Left
          { row: 0, column: 1 },  // Right
        ];
      
        const neighbors: Point[] = [];
      
        for (const dir of directions) {
          const newRow = row + dir.row;
          const newCol = col + dir.column;
          if (this.isValidMove(matrix, newRow, newCol)) {
            neighbors.push({ row: newRow, column: newCol });
          }
        }
      
        return neighbors;
      }

    private findEmptyPiece(state: number[][]): Point | undefined {
        // Find the position of the empty piece in the current state
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[0].length; j++) {
                if (state[i][j] === 0) {
                return { row: i, column: j };
                }
            }
        }
        return undefined;
    }

    private getStepsBfs(initialState: number[][], finalState: number[][]): Point[] {
        const queue: { state: number[][], path: Point[] }[] = [];
        const visited: Set<string> = new Set();
      
        queue.push({ state: initialState, path: [] });
        visited.add(JSON.stringify(initialState));

        while(queue.length > 0) {
            const { state, path } = queue.shift()!;
            if (JSON.stringify(state) === JSON.stringify(finalState)) {
                return path;
            }

            const emptyPos = this.findEmptyPiece(state);
            if (!emptyPos) continue;

            const neighbors = this.getNeighbors(state, emptyPos.row, emptyPos.column);

            for (const neighbor of neighbors) {
                const newState = JSON.parse(JSON.stringify(state));
                [newState[emptyPos.row][emptyPos.column], newState[neighbor.row][neighbor.column]] =
                  [newState[neighbor.row][neighbor.column], newState[emptyPos.row][emptyPos.column]]; // Swap positions
          
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
        if (JSON.stringify(currentState) === JSON.stringify(finalState)) {
            return path;
          }
        
          const emptyPos = this.findEmptyPiece(currentState);
          if (!emptyPos) return null;
        
          const neighbors = this.getNeighbors(currentState, emptyPos.row, emptyPos.column);

          for (const neighbor of neighbors) {
            const newState = JSON.parse(JSON.stringify(currentState));
            [newState[emptyPos.row][emptyPos.column], newState[neighbor.row][neighbor.column]] =
              [newState[neighbor.row][neighbor.column], newState[emptyPos.row][emptyPos.column]]; // Swap positions
        
            const key = JSON.stringify(newState);
            
            console.log('visited', visited);
            
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
