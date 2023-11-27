import { Injectable } from '@angular/core';
import { PuzzlesApi } from '../apis/puzzles.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { PuzzleDimensions } from '../interfaces/puzzle-dimensions.interface';
import { PuzzleMetadata } from '../interfaces/puzzle-metadata.interface';

@Injectable({
    providedIn: 'root',
})
export class PuzzlesFacade {
    private puzzlesMetadata$: BehaviorSubject<PuzzleMetadata[]>;
    private hasGeneratingSucceeded$: BehaviorSubject<boolean>;
    private isGeneratingPossible$: BehaviorSubject<boolean>;

    constructor(private puzzlesApi: PuzzlesApi) {
        this.puzzlesMetadata$ = new BehaviorSubject<PuzzleMetadata[]>([]);
        this.hasGeneratingSucceeded$ = new BehaviorSubject<boolean>(true);
        this.isGeneratingPossible$ = new BehaviorSubject<boolean>(true);
        this.UpdatePuzzlesMetadata();
    }

    public get PuzzlesMetadata$(): Observable<PuzzleMetadata[]> {
        return this.puzzlesMetadata$.asObservable();
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
        this.UpdatePuzzlesMetadata();
    }

    public async GeneratedPuzzleByDfs(puzzleDimensions: PuzzleDimensions): Promise<void> {
        this.isGeneratingPossible$.next(false);
        const hasSucceeded = await this.puzzlesApi.GeneratedPuzzleByDfs(puzzleDimensions.rows, puzzleDimensions.columns);
        this.isGeneratingPossible$.next(true);
        this.hasGeneratingSucceeded$.next(hasSucceeded);
        this.UpdatePuzzlesMetadata();
    }

    public async UpdatePuzzlesMetadata(): Promise<void> {
        this.puzzlesMetadata$.next(await this.puzzlesApi.PuzzlesMetadata);
    }
}

