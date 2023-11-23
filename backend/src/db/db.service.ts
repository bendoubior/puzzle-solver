import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export abstract class AbstractDbService {
    public abstract GetIds(): Promise<number[]>;
    public abstract FindOne(id: number): Promise<Puzzle>;
    public abstract CreateOne(puzzle: Puzzle): Promise<void>;
    public abstract UpdateOne(puzzle: Puzzle): Promise<void>;
}
