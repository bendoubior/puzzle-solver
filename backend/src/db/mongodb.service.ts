import { Injectable } from '@nestjs/common';
import { Puzzle } from 'src/interfaces/puzzle.interface';

@Injectable()
export class MongodbService {
    public async GetAll(): Promise<number[]> { return [1];};
    public async FindOne(id: number): Promise<Puzzle> { return {} as Puzzle};
    public async PushOne(puzzle: Puzzle): Promise<void> {};
    public async UpdateOne(puzzle: Puzzle): Promise<void> {};
}
