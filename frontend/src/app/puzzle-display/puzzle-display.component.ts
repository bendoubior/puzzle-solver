import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Puzzle } from '../interfaces/puzzle.interface';
import { Point } from '../interfaces/point.interface';

@Component({
  selector: 'app-puzzle-display',
  templateUrl: './puzzle-display.component.html',
  styleUrls: ['./puzzle-display.component.scss']
})
export class PuzzleDisplayComponent {
  @Input() Puzzle: Puzzle;
  @Input() XNeighbors: Point[];
  @Output() DeletePuzzle: EventEmitter<number>;
  @Output() CheckStep: EventEmitter<Point>;
  @Output() MoveStepForward: EventEmitter<void>;
  @Output() MoveStepBack: EventEmitter<void>;
  @Output() MoveToInitialState: EventEmitter<void>;
  @Output() MoveToFinalState: EventEmitter<void>;

  constructor() {
    this.DeletePuzzle = new EventEmitter<number>();
    this.CheckStep = new EventEmitter<Point>();
    this.MoveStepForward = new EventEmitter<void>();
    this.MoveStepBack = new EventEmitter<void>();
    this.MoveToInitialState = new EventEmitter<void>();
    this.MoveToFinalState = new EventEmitter<void>();
  }
  
  public RemovePuzzle(): void {
    this.DeletePuzzle.emit();
  }

  
  public StepCheck(step: Point): void {
    this.CheckStep.emit(step);
  }

  public StepForward(): void {
    this.MoveStepForward.emit();
  }
  
  public StepBack(): void {
    this.MoveStepBack.emit();
  }

  public InitialState(): void {
    this.MoveToInitialState.emit();
  }

  public FinalState(): void {
    this.MoveToFinalState.emit();
  }
}
