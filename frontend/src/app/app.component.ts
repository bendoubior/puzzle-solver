import { Component } from '@angular/core';
import { PuzzlesFacade } from './core/facades/puzzles.facade';
import { PuzzleStateFacade } from './core/facades/puzzle-state.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public PuzzlesFacade: PuzzlesFacade,
    public PuzzleStateFacade: PuzzleStateFacade) {}
}
