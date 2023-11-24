import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PuzzleDimensions } from '../interfaces/puzzle-dimensions.interface';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzlesComponent {
  @Input() PuzzlesIds: number[];
  @Output() UpdatePuzzle: EventEmitter<number>;
  @Output() GenerateDfsPuzzle: EventEmitter<PuzzleDimensions>;
  @Output() GenerateBfsPuzzle: EventEmitter<PuzzleDimensions>;
  public NumRows: number;
  public NumColumns: number;
  public GenerateType: string;

  constructor() { 
    this.PuzzlesIds = [];
    this.UpdatePuzzle = new EventEmitter<number>();
    this.GenerateDfsPuzzle = new EventEmitter<PuzzleDimensions>();
    this.GenerateBfsPuzzle = new EventEmitter<PuzzleDimensions>();
    this.NumRows = 3;
    this.NumColumns = 3;
    this.GenerateType = 'bfs';
  }

  public SetPuzzle(id: number): void {
    this.UpdatePuzzle.emit(id);
  }

  public CreatePuzzle(): void {
    if(this.NumRows <= 0 || this.NumColumns <= 0) return;
    if(this.GenerateType == 'dfs') this.GenerateDfsPuzzle.emit({
      rows: this.NumRows,
      columns: this.NumColumns
    } as PuzzleDimensions);
    if(this.GenerateType == 'bfs') this.GenerateBfsPuzzle.emit({
      rows: this.NumRows,
      columns: this.NumColumns
    } as PuzzleDimensions);
  }
}
