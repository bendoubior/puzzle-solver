import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Puzzle } from 'src/schemas/puzzle.schema';

@Injectable()
export class MongodbService {
    constructor(@InjectModel(Puzzle.name) private puzzleModel: Model<Puzzle>) {}

    public async GetIds(): Promise<number[]> {
        const puzzles = await this.puzzleModel.find().exec();
        return puzzles.map((puzzle: any) => puzzle._id);
    }

    public async FindOne(id: number): Promise<Puzzle> {
        if(!isValidObjectId(id)) return null;
        return this.puzzleModel.findById(id).exec();
    }

    public async CreateOne(puzzle: Puzzle): Promise<void> {
        this.puzzleModel.create(puzzle);
    }

    public async UpdateOne(puzzle: Puzzle): Promise<void> {
        this.puzzleModel.updateOne(puzzle);
    }
}
