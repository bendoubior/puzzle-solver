import { Test, TestingModule } from '@nestjs/testing';
import { GeneratePuzzlesService } from './generate-puzzles.service';

describe('GeneratePuzzlesService', () => {
  let service: GeneratePuzzlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratePuzzlesService],
    }).compile();

    service = module.get<GeneratePuzzlesService>(GeneratePuzzlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
