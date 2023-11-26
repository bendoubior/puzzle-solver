import { Test, TestingModule } from '@nestjs/testing';
import { GeneratePuzzlesService } from './generate-puzzles.service';
import { Point } from 'src/interfaces/point.interface';
import { GenerateMatrixService } from '../generate-matrix/generate-matrix.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { PuzzleActionsService } from '../puzzle-actions/puzzle-actions.service';
import { ConfigService } from '@nestjs/config';

class TestableGeneratePuzzlesService extends GeneratePuzzlesService {
    public getStepsBfs(initialState: number[][], finalState: number[][]): Point[] {
        return super.getStepsBfs(initialState, finalState);
    }
    public getStepsDfs(initialState: number[][], finalState: number[][]): Point[] {
        let visited = new Set<string>();
        visited.add(JSON.stringify(JSON.parse(JSON.stringify(initialState))));
        return super.getStepsDfs(initialState, finalState, visited);
    }
}

describe('GeneratePuzzlesService', () => {
    let service: TestableGeneratePuzzlesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GenerateMatrixService, UserProgressService, PuzzleActionsService, ConfigService, TestableGeneratePuzzlesService],
        }).compile();

        service = module.get<TestableGeneratePuzzlesService>(TestableGeneratePuzzlesService);
    });

    it('should have the bfs steps described', () => {
        expect(
            service.getStepsBfs(
                [
                    [3, 1],
                    [2, 0],
                ],
                [
                    [1, 2],
                    [3, 0],
                ],
            ),
        ).toEqual([
            { row: 1, column: 0 } as Point,
            { row: 0, column: 0 } as Point,
            { row: 0, column: 1 } as Point,
            { row: 1, column: 1 } as Point,
        ]);
    });

    it('should have the dfs steps described', () => {
        expect(
            service.getStepsDfs(
                [
                    [1, 2],
                    [3, 0],
                ],
                [
                    [1, 2],
                    [3, 0],
                ],
            ),
        ).toEqual([]);
    });
});

