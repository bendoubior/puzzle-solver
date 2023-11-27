import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PuzzlesService } from '../services/puzzles/puzzles.service';
import { PuzzleMetadata } from 'src/interfaces/puzzle-metadata.interface';

@Controller('puzzles')
export class PuzzlesController {
    constructor(private puzzlesService: PuzzlesService) {}

    @Get()
    public GetPuzzlesMetadata(): Promise<PuzzleMetadata[]> {
        return this.puzzlesService.GetPuzzlesMetadata();
    }

    @Delete()
    public DeleteAllPuzzles(): void {
        return this.puzzlesService.DeleteAllPuzzles();
    }

    @Post('bfs/:row/:column')
    public GeneratedPuzzleByBfs(@Param('row') row: number, @Param('column') column: number): boolean {
        return this.puzzlesService.GenerateAndSavePuzzleByBfs(row, column);
    }

    @Post('dfs/:row/:column')
    public GeneratedPuzzleByDfs(@Param('row') row: number, @Param('column') column: number): boolean {
        return this.puzzlesService.GenerateAndSavePuzzleByDfs(row, column);
    }
}

