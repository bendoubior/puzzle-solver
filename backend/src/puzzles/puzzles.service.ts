import { Injectable } from '@nestjs/common';
import { AbstractDbService } from 'src/db/db.service';
import { GeneratePuzzlesService } from 'src/generate-puzzles/generate-puzzles.service';
import { Puzzle, Step } from 'src/interfaces/puzzle.interface';
import { PuzzleStateService } from 'src/puzzle-state/puzzle-state.service';

@Injectable()
export class PuzzlesService {
    constructor(private dbService: AbstractDbService,
        private generatePuzzlesService: GeneratePuzzlesService,
        private puzzleStateService: PuzzleStateService) {}
    
    public GetPuzzlesIds(): Promise<number[]> {
      return this.dbService.GetIds();
    }

    public GetPuzzle(id: number): Promise<Puzzle> {
        return this.dbService.FindOne(id);
    }

    public async GeneratedPuzzleByBfs(row: number, column: number): Promise<void> {
        const generatedPuzzle = this.generatePuzzlesService.GenerateBfs(row, column);
        this.dbService.CreateOne(generatedPuzzle);
    }

    public async GeneratedPuzzleByDfs(row: number, column: number): Promise<void> {
        const generatedPuzzle = this.generatePuzzlesService.GenerateDfs(row, column);
        this.dbService.CreateOne(generatedPuzzle);
    }

    public async CheckStep(id: number, stepIndex: number, step: Step): Promise<boolean> {
        const puzzle = await this.dbService.FindOne(id);
        if(puzzle.steps[stepIndex] == step) {
            puzzle.numberOfCompletedSteps += 1;
            puzzle.completedSteps.push(step);
            puzzle.currentState = this.puzzleStateService.ExecuteStep(puzzle.currentState, step);
            this.dbService.UpdateOne(puzzle);
            return true;
        }
        return false;
    }
}
