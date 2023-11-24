import { Injectable } from '@angular/core';
import { PuzzlesApi } from '../apis/puzzles.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { PuzzleDimensions } from '../interfaces/puzzle-dimensions.interface';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesFacade {
  private puzzlesIds$: BehaviorSubject<number[]>;

  constructor(private puzzlesApi: PuzzlesApi) {
    this.puzzlesIds$ = new BehaviorSubject<number[]>([]);
    this.UpdatePuzzlesIds();
  }

  public get PuzzlesIds$(): Observable<number[]> {
    return this.puzzlesIds$.asObservable();
  }

  public async GeneratedPuzzleByBfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
    await this.puzzlesApi.GeneratedPuzzleByBfs(puzzleDimensions.rows, puzzleDimensions.columns);
    this.UpdatePuzzlesIds();
  }

  public async GeneratedPuzzleByDfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
    await this.puzzlesApi.GeneratedPuzzleByDfs(puzzleDimensions.rows, puzzleDimensions.columns);
    this.UpdatePuzzlesIds();
  }

  public async UpdatePuzzlesIds(): Promise<void> {
    this.puzzlesIds$.next(await this.puzzlesApi.PuzzlesIds);
  }
}
