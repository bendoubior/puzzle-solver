import { Test, TestingModule } from '@nestjs/testing';
import { AbstractDbService } from './db.service';

describe('DbService', () => {
  let service: AbstractDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstractDbService],
    }).compile();

    service = module.get<AbstractDbService>(AbstractDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
