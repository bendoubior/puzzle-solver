import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puzzle, Step } from '../interfaces/puzzle.interface';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesApi {
  private serverUrl: string;

  constructor(private http: HttpClient) { 
    this.serverUrl = `${environment.serverUrl}/puzzles`;
  }

  public GetPuzzlesIds(): Promise<number[]> {
    return firstValueFrom(this.http.get<number[]>(this.serverUrl));
  }

  public GetPuzzle(id: number): Promise<Puzzle> {
    return firstValueFrom(this.http.get<Puzzle>(`${this.serverUrl}/${id}`));
  }

  public GeneratedPuzzleByBfs(rows: number, columns: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/bfs/${rows}/${columns}`, null));
  }

  public GeneratedPuzzleByDfs(rows: number, columns: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/dfs/${rows}/${columns}`, null));
  }

  public CheckStep(id: number, stepIndex: number, step: Step): Promise<boolean> {
    const body = {
      stepIndex: stepIndex,
      step: step
    };
    return firstValueFrom(this.http.post<boolean>(`${this.serverUrl}/check-step/${id}`, body));
  }
}
