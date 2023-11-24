import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as SchemaMongoose } from "mongoose";
import { Point } from "src/interfaces/point.interface";
import { UserProgress } from "src/interfaces/user-progress.interface";

export type PuzzleDocument = HydratedDocument<Puzzle>;

@Schema()
export class Puzzle {
    @Prop() initialState: number[][];
    @Prop() finalState: number[][];
    @Prop() steps: Point[];
    @Prop() totalSteps: number;
    @Prop({ type: SchemaMongoose.Types.Mixed }) userProgress: UserProgress;
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle);