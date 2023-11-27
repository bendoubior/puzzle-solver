import { Module } from '@nestjs/common';
import { PuzzlesController } from './controllers/puzzles.controller';
import { PuzzlesService } from './services/puzzles/puzzles.service';
import { AbstractDbService } from './db/db.service';
import { MongodbService } from './db/mongodb.service';
import { GeneratePuzzlesService } from './services/generate-puzzles/generate-puzzles.service';
import { PuzzleStateService } from './services/puzzle-state/puzzle-state.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Puzzle, PuzzleSchema } from './schemas/puzzle.schema';
import { UserProgressService } from './services/user-progress/user-progress.service';
import { PuzzleStateController } from './controllers/puzzle-state.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { GenerateMatrixService } from './services/generate-matrix/generate-matrix.service';
import { PuzzleActionsService } from './services/puzzle-actions/puzzle-actions.service';
import { UtilsService } from './services/utils/utils.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/puzzles'),
        MongooseModule.forFeature([{ name: Puzzle.name, schema: PuzzleSchema }]),
        ConfigModule.forRoot({ load: [configuration] }),
    ],
    controllers: [PuzzlesController, PuzzleStateController],
    providers: [
        UtilsService,
        PuzzlesService,
        {
            provide: AbstractDbService,
            useClass: MongodbService,
        },
        GenerateMatrixService,
        PuzzleActionsService,
        GeneratePuzzlesService,
        PuzzleStateService,
        UserProgressService,
    ],
})
export class AppModule {}
