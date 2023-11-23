import { Component } from '@angular/core';
import { PuzzlesService } from './services/puzzles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public PuzzlesService: PuzzlesService) {}
}
