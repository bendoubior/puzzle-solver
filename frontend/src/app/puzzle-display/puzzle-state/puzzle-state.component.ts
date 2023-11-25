import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/interfaces/point.interface';

@Component({
  selector: 'app-puzzle-state',
  templateUrl: './puzzle-state.component.html',
  styleUrls: ['./puzzle-state.component.scss']
})
export class PuzzleStateComponent {
  @Input() State: number[][];
  @Input() XNeighbors: Point[];
  @Output() CheckStep: EventEmitter<Point>;

  constructor() {
    this.CheckStep = new EventEmitter<Point>();
  }

  public IsXNeighbor(row: number, column: number): boolean {
    return this.XNeighbors.some((point: Point) => point.row == row && point.column == column)
  }

  public ClickPoint(row: number, column: number): void {
    this.CheckStep.emit({ row: row, column: column } as Point);
  }
}
