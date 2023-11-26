import { Injectable } from '@angular/core';
import { PuzzlesApi } from '../apis/puzzles.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { PuzzleDimensions } from '../interfaces/puzzle-dimensions.interface';

@Injectable({
    providedIn: 'root',
})
export class PuzzlesFacade {
    private puzzlesIds$: BehaviorSubject<number[]>;
    private hasGeneratingSucceeded$: BehaviorSubject<boolean>;
    private isGeneratingPossible$: BehaviorSubject<boolean>;

    constructor(private puzzlesApi: PuzzlesApi) {
        this.puzzlesIds$ = new BehaviorSubject<number[]>([]);
        this.hasGeneratingSucceeded$ = new BehaviorSubject<boolean>(true);
        this.isGeneratingPossible$ = new BehaviorSubject<boolean>(true);
        this.UpdatePuzzlesIds();
    }

    public get PuzzlesIds$(): Observable<number[]> {
        return this.puzzlesIds$.asObservable();
    }

    public get HasGeneratingSucceeded$(): Observable<boolean> {
        return this.hasGeneratingSucceeded$.asObservable();
    }

    public get IsGeneratingPossible$(): Observable<boolean> {
        return this.isGeneratingPossible$.asObservable();
    }

    public async GeneratedPuzzleByBfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
        this.isGeneratingPossible$.next(false);
        const hasSucceeded = await this.puzzlesApi.GeneratedPuzzleByBfs(puzzleDimensions.rows, puzzleDimensions.columns);
        this.isGeneratingPossible$.next(true);
        this.hasGeneratingSucceeded$.next(hasSucceeded);
        this.UpdatePuzzlesIds();
    }

    public async GeneratedPuzzleByDfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
        this.isGeneratingPossible$.next(false);
        const hasSucceeded = await this.puzzlesApi.GeneratedPuzzleByDfs(puzzleDimensions.rows, puzzleDimensions.columns);
        this.isGeneratingPossible$.next(true);
        this.hasGeneratingSucceeded$.next(hasSucceeded);
        this.UpdatePuzzlesIds();
    }

    public async UpdatePuzzlesIds(): Promise<void> {
        this.puzzlesIds$.next(await this.puzzlesApi.PuzzlesIds);
    }
}

