import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { PuzzleMetadata as PuzzleMetadata } from 'src/interfaces/puzzle-metadata.interface';
import { GeneratePuzzlesService } from 'src/services/generate-puzzles/generate-puzzles.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PuzzlesService {
    constructor(
        private dbService: AbstractDbService,
        private generatePuzzlesService: GeneratePuzzlesService,
        private utilsService: UtilsService,
    ) {}

    public async GetPuzzlesMetadata(): Promise<PuzzleMetadata[]> {
        const puzzles = await this.dbService.GetAll();
        return puzzles.map((puzzle: any) => {
            return {
                id: puzzle._id,
                progressPercentage: this.utilsService.ZeroToOneToPercentage(puzzle.userProgress.numberOfCompletedSteps / puzzle.totalSteps),
            } as PuzzleMetadata;
        });
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

