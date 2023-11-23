import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PuzzlesService as PuzzlesService } from './puzzles.service';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { Point } from 'src/interfaces/point.interface';
import { log } from 'console';

@Controller('puzzles')
export class PuzzlesController {
    constructor(private puzzlesService: PuzzlesService) {}
    
    @Get()
    public GetPuzzlesIds(): Promise<number[]> {
      return this.puzzlesService.GetPuzzlesIds();
    }

    @Get(':id')
    public GetPuzzle(@Param('id') id: number): Promise<Puzzle> {
      return this.puzzlesService.GetPuzzle(id);
    }

    @Post('bfs/:row/:column')
    public GeneratedPuzzleByBfs(@Param('row') row: number, @Param('column') column: number): Promise<void> {
      return this.puzzlesService.GeneratedPuzzleByBfs(row, column);
    }

    @Post('dfs/:row/:column')
    public GeneratedPuzzleByDfs(@Param('row') row: number, @Param('column') column: number): Promise<void> {
      return this.puzzlesService.GeneratedPuzzleByDfs(row, column);
    }

    @Post('check-step/:id')
    public CheckStep(@Param('id') id: number, @Body('stepIndex') stepIndex: number, @Body('step') step: Point): Promise<boolean> {
      return this.puzzlesService.CheckStep(id, stepIndex, step);
    }
}
