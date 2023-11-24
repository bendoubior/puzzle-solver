import { Component, Input } from '@angular/core';
import { Point } from 'src/app/interfaces/point.interface';

@Component({
  selector: 'app-puzzle-state',
  templateUrl: './puzzle-state.component.html',
  styleUrls: ['./puzzle-state.component.scss']
})
export class PuzzleStateComponent {
  @Input() State: number[][];
  @Input() XNeighbors: Point[];

  public IsXNeighbor(row: number, column: number): boolean {
    return this.XNeighbors.some((point: Point) => point.row == row && point.column == column)
  }
}
