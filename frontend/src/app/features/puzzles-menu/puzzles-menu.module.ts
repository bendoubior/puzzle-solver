import { NgModule } from '@angular/core';
import { PuzzlesMenuComponent } from './container/puzzles-menu.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PuzzlesMenuComponent],
    imports: [CommonModule, FormsModule],
    exports: [PuzzlesMenuComponent],
})
export class PuzzlesMenuModule {}

