import { Injectable } from '@angular/core';
import { PuzzlesApi } from '../apis/puzzles.api';
import { PuzzleDimensions } from '../interfaces/puzzle-dimensions.interface';
import { Puzzle } from '../interfaces/puzzle.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesService {
  private puzzlesIds$: BehaviorSubject<number[]>;
  private currentPuzzle$: BehaviorSubject<Puzzle>;

  constructor(private puzzlesApi: PuzzlesApi) {
    this.puzzlesIds$ = new BehaviorSubject<number[]>([]);
    this.currentPuzzle$ = new BehaviorSubject<Puzzle>({} as Puzzle);
    this.fetchPuzzlesIds();
  }

  public get PuzzlesIds$(): Observable<number[]> {
    return this.puzzlesIds$.asObservable();
  }

  public get Puzzle$(): Observable<Puzzle> {
    return this.currentPuzzle$.asObservable();
  }

  public async GeneratedPuzzleByBfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
    await this.puzzlesApi.GeneratedPuzzleByBfs(puzzleDimensions.rows, puzzleDimensions.columns);
    this.fetchPuzzlesIds();
  }

  public async GeneratedPuzzleByDfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
    await this.puzzlesApi.GeneratedPuzzleByDfs(puzzleDimensions.rows, puzzleDimensions.columns);
    this.fetchPuzzlesIds();
  }

  public async SetCurrentPuzzle(id: number): Promise<void> {
    this.fetchPuzzle(id);
  }

  private async fetchPuzzlesIds(): Promise<void> {
    this.puzzlesIds$.next(await this.puzzlesApi.GetPuzzlesIds());
  }

  private async fetchPuzzle(id: number): Promise<void> {
    this.currentPuzzle$.next(await this.puzzlesApi.GetPuzzle(id));
  }
}
