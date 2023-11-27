import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { PuzzleMetadata } from '../interfaces/puzzle-metadata.interface';

@Injectable({
    providedIn: 'root',
})
export class PuzzlesApi {
    private serverUrl: string;

    constructor(private http: HttpClient) {
        this.serverUrl = `http://${environment.serverUrl}/puzzles`;
    }

    public get PuzzlesMetadata(): Promise<PuzzleMetadata[]> {
        return firstValueFrom(this.http.get<PuzzleMetadata[]>(this.serverUrl));
    }

    public GeneratedPuzzleByBfs(rows: number, columns: number): Promise<boolean> {
        return firstValueFrom(this.http.post<boolean>(`${this.serverUrl}/bfs/${rows}/${columns}`, null));
    }

    public GeneratedPuzzleByDfs(rows: number, columns: number): Promise<boolean> {
        return firstValueFrom(this.http.post<boolean>(`${this.serverUrl}/dfs/${rows}/${columns}`, null));
    }
}

