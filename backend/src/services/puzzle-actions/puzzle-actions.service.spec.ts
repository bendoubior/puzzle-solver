import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleActionsService } from './puzzle-actions.service';

describe('PuzzleActionsService', () => {
  let service: PuzzleActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuzzleActionsService],
    }).compile();

    service = module.get<PuzzleActionsService>(PuzzleActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
