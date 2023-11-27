import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export abstract class AbstractDbService {
    public abstract GetAll(): Promise<Puzzle[]>;
    public abstract FindOne(id: number): Promise<Puzzle>;
    public abstract DeleteOne(id: number): Promise<void>;
    public abstract DeleteAll(): Promise<void>;
    public abstract CreateOne(puzzle: Puzzle): Promise<void>;
    public abstract FindOneAndUpdate(id: number, puzzle: Puzzle): Promise<void>;
}
