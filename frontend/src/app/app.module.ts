import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PuzzlesMenuModule } from './features/puzzles-menu/puzzles-menu.module';
import { PuzzleDisplayModule } from './features/puzzle-display/puzzle-display.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, PuzzlesMenuModule, PuzzleDisplayModule],
    bootstrap: [AppComponent],
})
export class AppModule {}

