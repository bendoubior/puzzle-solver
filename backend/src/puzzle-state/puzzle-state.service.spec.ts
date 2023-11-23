import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleStateService } from './puzzle-state.service';

describe('PuzzleStateService', () => {
  let service: PuzzleStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuzzleStateService],
    }).compile();

    service = module.get<PuzzleStateService>(PuzzleStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
