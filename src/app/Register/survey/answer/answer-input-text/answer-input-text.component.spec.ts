import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInputTextComponent } from './answer-input-text.component';

describe('AnswerInputTextComponent', () => {
  let component: AnswerInputTextComponent;
  let fixture: ComponentFixture<AnswerInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
