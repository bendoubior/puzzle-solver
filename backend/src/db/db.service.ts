import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export abstract class AbstractDbService {
    public abstract GetAll(): Promise<number[]>;
    public abstract FindOne(id: number): Promise<Puzzle>;
    public abstract PushOne(puzzle: Puzzle): Promise<void>;
    public abstract UpdateOne(puzzle: Puzzle): Promise<void>;
}
