import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleStateComponent } from './puzzle-state.component';

describe('PuzzleStateComponent', () => {
  let component: PuzzleStateComponent;
  let fixture: ComponentFixture<PuzzleStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
