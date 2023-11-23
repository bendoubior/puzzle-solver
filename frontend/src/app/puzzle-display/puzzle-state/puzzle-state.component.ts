import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-puzzle-state',
  templateUrl: './puzzle-state.component.html',
  styleUrls: ['./puzzle-state.component.scss']
})
export class PuzzleStateComponent {
  @Input() State: number[][];

  constructor() { 
    this.State = [];
  }
}
