import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puzzle } from '../interfaces/puzzle.interface';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Point } from '../interfaces/point.interface';

@Injectable({
  providedIn: 'root'
})
export class PuzzleStateApi {
  private serverUrl: string;

  constructor(private http: HttpClient) { 
    this.serverUrl = `http://${environment.serverUrl}/puzzle-state`;
  }

  public GetPuzzle(id: number): Promise<Puzzle> {
    return firstValueFrom(this.http.get<Puzzle>(`${this.serverUrl}/${id}`));
  }

  public DeletePuzzle(id: number): Promise<Puzzle> {
    return firstValueFrom(this.http.delete<Puzzle>(`${this.serverUrl}/${id}`));
  }

  public CheckStep(id: number, stepIndex: number, step: Point): Promise<void> {
    const body = {
      stepIndex: stepIndex,
      step: step
    };
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/check-step/${id}`, body));
  }

  public MoveStepForward(id: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/move-forward/${id}`, null));
  }

  public MoveStepBack(id: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/move-back/${id}`, null));
  }

  public MoveToInitialState(id: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/move-initial-state/${id}`, null));
  }

  public MoveToFinalState(id: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/move-final-state/${id}`, null));
  }
}
