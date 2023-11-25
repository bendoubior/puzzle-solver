import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puzzle } from '../interfaces/puzzle.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Point } from '../interfaces/point.interface';
import { PuzzleStateApi } from '../apis/puzzle-state.api';
import { PuzzlesFacade } from './puzzles.facade';

@Injectable({
  providedIn: 'root'
})
export class PuzzleStateFacade {
  private puzzle$: BehaviorSubject<Puzzle>;
  
  constructor(private puzzleStateApi: PuzzleStateApi, private puzzlesFacade: PuzzlesFacade) {
    this.puzzle$ = new BehaviorSubject<Puzzle>(null);
  }

  public get Puzzle$(): Observable<Puzzle> {
    return this.puzzle$.asObservable();
  }
  
  public async SetPuzzle(id: number): Promise<void> {
    const newPuzzle = await this.puzzleStateApi.GetPuzzle(id);
    this.puzzle$.next(newPuzzle);
  }

  public async DeletePuzzle(): Promise<void> {
    await this.puzzleStateApi.DeletePuzzle(this.puzzle$.value._id);
    this.puzzle$.next(null);
    this.puzzlesFacade.UpdatePuzzlesIds();
  }

  public async CheckStep(step: Point): Promise<void> {
    const currentPuzzle = this.puzzle$.value;
    await this.puzzleStateApi.CheckStep(currentPuzzle._id, currentPuzzle.userProgress.currentStepIndex, step);
    this.SetPuzzle(currentPuzzle._id);
  }

  public async MoveStepForward(): Promise<void> {
    await this.puzzleStateApi.MoveStepForward(this.puzzle$.value._id);
    this.SetPuzzle(this.puzzle$.value._id);
  }

  public async MoveStepBack(): Promise<void> {
    await this.puzzleStateApi.MoveStepBack(this.puzzle$.value._id);
    this.SetPuzzle(this.puzzle$.value._id);
  }

  public async MoveToInitialState(): Promise<void> {
    await this.puzzleStateApi.MoveToInitialState(this.puzzle$.value._id);
    this.SetPuzzle(this.puzzle$.value._id);
  }

  public async MoveToFinalState(): Promise<void> {
    await this.puzzleStateApi.MoveToFinalState(this.puzzle$.value._id);
    this.SetPuzzle(this.puzzle$.value._id);
  }

  private updateXNeightbors(): void {

  }
}
