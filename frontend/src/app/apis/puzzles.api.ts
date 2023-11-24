import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesApi {
  private serverUrl: string;

  constructor(private http: HttpClient) { 
    this.serverUrl = `http://${environment.serverUrl}/puzzles`;
  }

  public get PuzzlesIds(): Promise<number[]> {
    return firstValueFrom(this.http.get<number[]>(this.serverUrl));
  }

  public GeneratedPuzzleByBfs(rows: number, columns: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/bfs/${rows}/${columns}`, null));
  }

  public GeneratedPuzzleByDfs(rows: number, columns: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.serverUrl}/dfs/${rows}/${columns}`, null));
  }
}
