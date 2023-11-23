import { Component, Input } from '@angular/core';
import { Puzzle } from '../interfaces/puzzle.interface';

@Component({
  selector: 'app-puzzle-display',
  templateUrl: './puzzle-display.component.html',
  styleUrls: ['./puzzle-display.component.scss']
})
export class PuzzleDisplayComponent {
  @Input() set Puzzle(puzzle: Puzzle) {
    this.CurrentPuzzle = puzzle;
    this.CurrentState = puzzle.initialState;
    this.CurrentStep = 0;
    this.NumSteps = puzzle.totalSteps;
  };
  public CurrentPuzzle: Puzzle;
  public CurrentState: number[][];
  public CurrentStep: number;
  public NumSteps: number;
  
  constructor() {
    this.CurrentPuzzle = {} as Puzzle;
    this.CurrentState = [];
    this.CurrentStep = 0;
    this.NumSteps = 0;
  }

  public MoveStepForward(): void {
    this.CurrentStep += 1;
    // move forward
  }
  
  public MoveStepBack(): void {
    this.CurrentStep -= 1;
    // move back
  }

  public MoveToInitialState(): void {
    this.CurrentStep = 0;
    this.CurrentState = this.CurrentPuzzle.initialState;
  }

  public MoveToFinalState(): void {
    this.CurrentStep = 0;
    this.CurrentState = this.CurrentPuzzle.finalState;
  }
}
