import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { GeneratePuzzlesService } from 'src/services/generate-puzzles/generate-puzzles.service';
import { UserProgressService } from 'src/services/user-progress/user-progress.service';

@Injectable()
export class PuzzlesService {
    constructor(private dbService: AbstractDbService,
        private generatePuzzlesService: GeneratePuzzlesService,
        private userProgressService: UserProgressService) {}
    
    public GetPuzzlesIds(): Promise<number[]> {
        return this.dbService.GetIds();
    }

    public DeleteAllPuzzles(): void {
        this.dbService.DeleteAll();
    }

    public GeneratedPuzzleByBfs(row: number, column: number): boolean {
        const generatedPuzzle = this.generatePuzzlesService.GenerateBfs(row, column);
        if(generatedPuzzle === null) return false;
        generatedPuzzle.userProgress = this.userProgressService.GetInitialUserProgress(generatedPuzzle.initialState);        
        this.dbService.CreateOne(generatedPuzzle);
        return true;
    }

    public GeneratedPuzzleByDfs(row: number, column: number): boolean {
        const generatedPuzzle = this.generatePuzzlesService.GenerateDfs(row, column);
        if(generatedPuzzle === null) return false;
        generatedPuzzle.userProgress = this.userProgressService.GetInitialUserProgress(generatedPuzzle.initialState);
        this.dbService.CreateOne(generatedPuzzle);
        return true;
    }
}