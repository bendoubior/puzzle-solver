import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { AbstractDbService } from 'src/db/db.service';
import { GeneratePuzzlesService } from 'src/generate-puzzles/generate-puzzles.service';
import { Point } from 'src/interfaces/point.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { PuzzleStateService } from 'src/puzzle-state/puzzle-state.service';
import { UserProgressService } from 'src/services/user-progress.service';

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

    public GeneratedPuzzleByBfs(row: number, column: number): void {
        const generatedPuzzle = this.generatePuzzlesService.GenerateBfs(row, column);
        if(generatedPuzzle === null) return;
        generatedPuzzle.userProgress = this.userProgressService.GetInitialUserProgress(generatedPuzzle.initialState);        
        this.dbService.CreateOne(generatedPuzzle);
    }

    public GeneratedPuzzleByDfs(row: number, column: number): void {
        const generatedPuzzle = this.generatePuzzlesService.GenerateDfs(row, column);
        generatedPuzzle.userProgress = this.userProgressService.GetInitialUserProgress(generatedPuzzle.initialState);
        this.dbService.CreateOne(generatedPuzzle);
    }
}
