import { Injectable } from '@nestjs/common';
import { PiecePosition } from 'src/interfaces/piece-position.interface';
import { Step } from 'src/interfaces/puzzle.interface';

@Injectable()
export class PuzzleStateService {

    public ExecuteStep(state: number[][], step: Step): number[][] {   
        const xPosition = this.findPositionOfMissingPiece(state);
        if(!xPosition) return state;
        if(step == Step.Left && xPosition.column > 0) return this.replacePosition(state, xPosition, {row: xPosition.row, column: xPosition.column - 1} as PiecePosition)
        if(step == Step.Right && xPosition.column < state[0].length - 1) return this.replacePosition(state, xPosition, {row: xPosition.row, column: xPosition.column + 1} as PiecePosition)
        if(step == Step.Up && xPosition.row > 0) return this.replacePosition(state, xPosition, {row: xPosition.row - 1, column: xPosition.column} as PiecePosition)
        if(step == Step.Down && xPosition.row < state.length - 1) return this.replacePosition(state, xPosition, {row: xPosition.row + 1, column: xPosition.column} as PiecePosition)
        return state;
    }
    
    private replacePosition(state: number[][], piece1: PiecePosition, piece2: PiecePosition): number[][] {
        const temp = state[piece1.row][piece1.column];
        state[piece1.row][piece1.column] = state[piece2.row][piece2.column];
        state[piece2.row][piece2.column] = temp;
        return state;
    }

    private findPositionOfMissingPiece(state: number[][]): PiecePosition {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if(state[i][j] == 0) return {
                    row: i,
                    column: j
                } as PiecePosition;
            }
        }
        return null;
    }
}
