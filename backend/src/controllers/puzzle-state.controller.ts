import { Controller, Get, Param, Body, Delete, Post } from '@nestjs/common';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { PuzzleStateService } from 'src/services/puzzle-state/puzzle-state.service';

@Controller('puzzle-state')
export class PuzzleStateController {
    constructor(private puzzleStateService: PuzzleStateService,) {}

    @Get(':id')
    public GetPuzzle(@Param('id') id: number): Promise<Puzzle> {
      return this.puzzleStateService.GetPuzzle(id);
    }

    @Delete(':id')
    public DeletePuzzle(@Param('id') id: number): Promise<void> {
      return this.puzzleStateService.DeletePuzzle(id);
    }

    @Post('check-step/:id')
    public CheckStep(@Param('id') id: number, @Body('stepIndex') stepIndex: number, @Body('step') step: Point): Promise<void> {
        return this.puzzleStateService.CheckStep(id, stepIndex, step);
    }

    @Post('move-forward/:id')
    public MoveStepForward(@Param('id') id: number): Promise<void> {
        return this.puzzleStateService.MoveStepForward(id);
    }
    
    @Post('move-back/:id')
    public MoveStepBack(@Param('id') id: number): Promise<void> {
        return this.puzzleStateService.MoveStepBack(id);
    }

    @Post('move-initial-state/:id')
    public MoveToInitialState(@Param('id') id: number): Promise<void> {
        return this.puzzleStateService.MoveToInitialState(id);
    }

    @Post('move-final-state/:id')
    public MoveToFinalState(@Param('id') id: number): Promise<void> {
        return this.puzzleStateService.MoveToFinalState(id);
    }
}
