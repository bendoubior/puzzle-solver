import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { GeneratePuzzlesService } from 'src/services/generate-puzzles/generate-puzzles.service';

@Injectable()
export class PuzzlesService {
    constructor(private dbService: AbstractDbService, private generatePuzzlesService: GeneratePuzzlesService) {}

    public GetPuzzlesIds(): Promise<number[]> {
        return this.dbService.GetIds();
    }

    public DeleteAllPuzzles(): void {
        this.dbService.DeleteAll();
    }

    public GenerateAndSavePuzzleByBfs(row: number, column: number): boolean {
        const generatedPuzzle = this.generatePuzzlesService.GenerateBfs(row, column);
        if (generatedPuzzle === null) return false;
        this.dbService.CreateOne(generatedPuzzle);
        return true;
    }

    public GenerateAndSavePuzzleByDfs(row: number, column: number): boolean {
        const generatedPuzzle = this.generatePuzzlesService.GenerateDfs(row, column);
        if (generatedPuzzle === null) return false;
        this.dbService.CreateOne(generatedPuzzle);
        return true;
    }
}

