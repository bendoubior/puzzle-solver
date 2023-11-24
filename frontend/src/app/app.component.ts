import { Component } from '@angular/core';
import { PuzzlesFacade } from './facades/puzzles.facade';
import { PuzzleStateFacade } from './facades/puzzle-state.facade';
import { PuzzleStateService } from './services/puzzle-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public PuzzlesService: PuzzlesFacade,
    public PuzzleStateFacade: PuzzleStateFacade,
    public PuzzleStateService: PuzzleStateService) {}
}
