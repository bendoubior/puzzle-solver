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
        if (!isValidObjectId(id)) return null;
        return this.puzzleModel.findById(id).exec();
    }

    public DeleteOne(id: number): Promise<void> {
        if (!isValidObjectId(id)) return null;
        this.puzzleModel.findByIdAndDelete(id).exec();
    }

    public async DeleteAll(): Promise<void> {
        this.puzzleModel.deleteMany({}).exec();
    }

    public async CreateOne(puzzle: Puzzle): Promise<void> {
        this.puzzleModel.create(puzzle);
    }

    public async FindOneAndUpdate(id: number, puzzle: Puzzle): Promise<void> {
        this.puzzleModel.findOneAndUpdate({ _id: id }, { ...puzzle }, { new: true, select: '-_id' }).exec();
    }
}

