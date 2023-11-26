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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
