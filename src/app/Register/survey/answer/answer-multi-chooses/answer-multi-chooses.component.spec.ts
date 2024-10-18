import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerMultiChoosesComponent } from './answer-multi-chooses.component';

describe('AnswerMultiChoosesComponent', () => {
  let component: AnswerMultiChoosesComponent;
  let fixture: ComponentFixture<AnswerMultiChoosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerMultiChoosesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerMultiChoosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
