import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleStateController } from './puzzle-state.controller';

describe('PuzzleStateController', () => {
  let controller: PuzzleStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuzzleStateController],
    }).compile();

    controller = module.get<PuzzleStateController>(PuzzleStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
