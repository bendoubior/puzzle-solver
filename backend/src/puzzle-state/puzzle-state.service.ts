import { Injectable } from '@nestjs/common';
import { Point } from 'src/interfaces/point.interface';

@Injectable()
export class PuzzleStateService {

    public ExecuteStep(state: number[][], step: Point): number[][] {   
        const xPosition = this.findPositionOfMissingPiece(state);
        if(!xPosition) return state;
        this.replacePosition(state, xPosition, step);
        return state;
    }
    
    private replacePosition(state: number[][], piece1: Point, piece2: Point): number[][] {
        const temp = state[piece1.row][piece1.column];
        state[piece1.row][piece1.column] = state[piece2.row][piece2.column];
        state[piece2.row][piece2.column] = temp;
        return state;
    }

    private findPositionOfMissingPiece(state: number[][]): Point {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if(state[i][j] == 0) return {
                    row: i,
                    column: j
                } as Point;
            }
        }
        return null;
    }
}
