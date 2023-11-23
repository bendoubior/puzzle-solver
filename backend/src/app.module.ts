import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PuzzlesController } from './puzzles/puzzles.controller';
import { PuzzlesService } from './puzzles/puzzles.service';
import { AbstractDbService } from './db/db.service';
import { MongodbService } from './db/mongodb.service';
import { GeneratePuzzlesService } from './generate-puzzles/generate-puzzles.service';
import { PuzzleStateService } from './puzzle-state/puzzle-state.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Puzzle, PuzzleSchema } from './schemas/puzzle.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/puzzles'),
    MongooseModule.forFeature([{ name: Puzzle.name, schema: PuzzleSchema }])
  ],
  controllers: [PuzzlesController],
  providers: [
    AppService, 
    PuzzlesService, 
    {
      provide: AbstractDbService,
      useClass: MongodbService
    }, GeneratePuzzlesService, PuzzleStateService
  ],
})
export class AppModule {}
