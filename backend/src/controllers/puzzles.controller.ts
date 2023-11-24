import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PuzzlesService } from '../puzzles/puzzles.service';

@Controller('puzzles')
export class PuzzlesController {
    constructor(private puzzlesService: PuzzlesService) {}
    
    @Get()
    public GetPuzzlesIds(): Promise<number[]> {
      return this.puzzlesService.GetPuzzlesIds();
    }

    @Delete()
    public DeleteAllPuzzles(): void {
      return this.puzzlesService.DeleteAllPuzzles();
    }

    @Post('bfs/:row/:column')
    public GeneratedPuzzleByBfs(@Param('row') row: number, @Param('column') column: number): void {
      return this.puzzlesService.GeneratedPuzzleByBfs(row, column);
    }

    @Post('dfs/:row/:column')
    public GeneratedPuzzleByDfs(@Param('row') row: number, @Param('column') column: number): void {
      return this.puzzlesService.GeneratedPuzzleByDfs(row, column);
    }
}
