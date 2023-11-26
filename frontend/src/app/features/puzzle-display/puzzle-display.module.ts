import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleDisplayComponent } from './container/puzzle-display.component';
import { PuzzleStateComponent } from './components/puzzle-state/puzzle-state.component';

@NgModule({
  declarations: [
    PuzzleDisplayComponent,
    PuzzleStateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PuzzleDisplayComponent]
})
export class PuzzleDisplayModule { }
