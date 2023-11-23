import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Step } from "src/interfaces/puzzle.interface";

export type PuzzleDocument = HydratedDocument<Puzzle>;

@Schema()
export class Puzzle {
    @Prop() initialState: number[][];
    @Prop() finalState: number[][];
    @Prop() steps: Step[];
    @Prop() totalSteps: number;
    @Prop() currentState: number[][];
    @Prop() completedSteps: Step[];
    @Prop() numberOfCompletedSteps: number;
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle);