import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PuzzlesController } from './controllers/puzzles.controller';
import { PuzzlesService } from './puzzles/puzzles.service';
import { AbstractDbService } from './db/db.service';
import { MongodbService } from './db/mongodb.service';
import { GeneratePuzzlesService } from './generate-puzzles/generate-puzzles.service';
import { PuzzleStateService } from './puzzle-state/puzzle-state.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Puzzle, PuzzleSchema } from './schemas/puzzle.schema';
import { UserProgressService } from './services/user-progress.service';
import { PuzzleStateController } from './controllers/puzzle-state.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/puzzles'),
    MongooseModule.forFeature([{ name: Puzzle.name, schema: PuzzleSchema }]),
    ConfigModule.forRoot({load: [configuration]})
  ],
  controllers: [PuzzlesController, PuzzleStateController],
  providers: [
    AppService, 
    PuzzlesService, 
    {
      provide: AbstractDbService,
      useClass: MongodbService
    }, GeneratePuzzlesService, 
    PuzzleStateService,
    UserProgressService,
  ],
})
export class AppModule {}
