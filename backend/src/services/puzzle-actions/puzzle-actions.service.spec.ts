import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleActionsService } from './puzzle-actions.service';
import { Point } from 'src/interfaces/point.interface';

describe('PuzzleActionsService', () => {
    let service: PuzzleActionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PuzzleActionsService],
        }).compile();

        service = module.get<PuzzleActionsService>(PuzzleActionsService);
    });

    it('points should be equal', () => {
        expect(service.ArePointsEqual({ row: 0, column: 0 } as Point, { row: 0, column: 0 } as Point)).toBeTruthy();
    });

    it('points should be not equal', () => {
        expect(service.ArePointsEqual({ row: 1, column: 0 } as Point, { row: 0, column: 0 } as Point)).toBeFalsy();
    });

    it('matrixes should be equal', () => {
        expect(
            service.AreMatrixesEqual(
                [
                    [0, 1],
                    [2, 3],
                ],
                [
                    [0, 1],
                    [2, 3],
                ],
            ),
        ).toBeTruthy();
    });

    it('matrixes should be not equal', () => {
        expect(
            service.AreMatrixesEqual(
                [
                    [1, 0],
                    [2, 3],
                ],
                [
                    [0, 1],
                    [2, 3],
                ],
            ),
        ).toBeFalsy();
    });

    it('point value should be (0,0)', () => {
        expect(
            service.GetXPointByValue([
                [0, 1],
                [2, 3],
            ]),
        ).toEqual({ row: 0, column: 0 } as Point);
    });

    it('neighbors should be (1,0), (0,1)', () => {
        expect(
            service.GetPointNeighbors(
                [
                    [0, 1],
                    [2, 3],
                ],
                { row: 0, column: 0 } as Point,
            ),
        ).toEqual([{ row: 1, column: 0 } as Point, { row: 0, column: 1 } as Point]);
    });

    it('matrix should switch poisitions of (0,0) and (0,1)', () => {
        expect(
            service.SwitchPointsPositions(
                [
                    [0, 1],
                    [2, 3],
                ],
                { row: 0, column: 0 } as Point,
                { row: 0, column: 1 } as Point,
            ),
        ).toEqual([
            [1, 0],
            [2, 3],
        ]);
    });

    it('matrix should switch poisitions of x in (0,0) and (0,1)', () => {
        expect(
            service.SwitchPointWithXPoint(
                [
                    [0, 1],
                    [2, 3],
                ],
                { row: 0, column: 1 } as Point,
            ),
        ).toEqual([
            [1, 0],
            [2, 3],
        ]);
    });
});

