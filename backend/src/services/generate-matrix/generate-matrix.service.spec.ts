import { Test, TestingModule } from '@nestjs/testing';
import { GenerateMatrixService } from './generate-matrix.service';

describe('GenerateMatrixService', () => {
    let service: GenerateMatrixService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GenerateMatrixService],
        }).compile();

        service = module.get<GenerateMatrixService>(GenerateMatrixService);
    });

    it('should generate a matrix 1*1 with value 0', () => {
        expect(service.GenerateRandomMatrix(1, 1)).toEqual([[0]]);
    });

    it('should generate a matrix 2*2 with values [[1,2],[3,0]]', () => {
        expect(service.GenerateFinalMatrix(2, 2)).toEqual([
            [1, 2],
            [3, 0],
        ]);
    });

    it('should generate a matrix 3*3 with values [[1,2,3],[4,5,6],[7,8,0]]', () => {
        expect(service.GenerateFinalMatrix(3, 3)).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0],
        ]);
    });
});

