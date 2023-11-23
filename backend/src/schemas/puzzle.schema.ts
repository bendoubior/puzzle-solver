import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Point } from "src/interfaces/point.interface";

export type PuzzleDocument = HydratedDocument<Puzzle>;

@Schema()
export class Puzzle {
    @Prop() initialState: number[][];
    @Prop() finalState: number[][];
    @Prop() steps: Point[];
    @Prop() totalSteps: number;
    @Prop() currentState: number[][];
    @Prop() completedSteps: Point[];
    @Prop() numberOfCompletedSteps: number;
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle);