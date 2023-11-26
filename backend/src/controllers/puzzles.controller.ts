import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PuzzlesService } from '../services/puzzles/puzzles.service';

@Controller('puzzles')
export class PuzzlesController {
    constructor(private puzzlesService: PuzzlesService,
      private readonly configService: ConfigService) {}
    
    @Get()
    public GetPuzzlesIds(): Promise<number[]> {
      return this.puzzlesService.GetPuzzlesIds();
    }

    @Delete()
    public DeleteAllPuzzles(): void {
      return this.puzzlesService.DeleteAllPuzzles();
    }

    @Post('bfs/:row/:column')
    public GeneratedPuzzleByBfs(@Param('row') row: number, @Param('column') column: number): boolean {
      for (let i = 0; i < this.configService.get<number>('generatePuzzleMaxAttempts'); i++) {
        if(this.puzzlesService.GeneratedPuzzleByBfs(row, column)) return true;
      }
      return false;
    }

    @Post('dfs/:row/:column')
    public GeneratedPuzzleByDfs(@Param('row') row: number, @Param('column') column: number): boolean {
      for (let i = 0; i < this.configService.get<number>('generatePuzzleMaxAttempts'); i++) {
        if(this.puzzlesService.GeneratedPuzzleByDfs(row, column)) return true;
      }
      return false;
    }
}
