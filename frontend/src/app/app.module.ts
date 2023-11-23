import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PuzzleDisplayComponent } from './puzzle-display/puzzle-display.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PuzzleStateComponent } from './puzzle-display/puzzle-state/puzzle-state.component';

@NgModule({
  declarations: [
    AppComponent,
    PuzzleDisplayComponent,
    PuzzlesComponent,
    PuzzleStateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
