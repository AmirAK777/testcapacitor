import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'app/Register/shared/question';
import { AnswerMultiChoosesComponent } from '../answer/answer-multi-chooses/answer-multi-chooses.component';
import { RegisterService } from 'app/Register/shared/register-service.service';
import { Answer } from 'app/Register/shared/answer';

@Component({
  selector: 'clovis-questions',
  standalone: true,
  imports: [CommonModule, AnswerMultiChoosesComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent {
  @Input({required: true}) question!: Question;
  @Input({required: true}) color!: string;
  @Output() answerSubmitted = new EventEmitter<string | number>();

  constructor(private readonly registerService: RegisterService) {  }

  setAnswerSelected(response : string | number) {
    this.answerSubmitted.emit(response);
  }

  isAnswerSelected(answer: Answer) : boolean {
    switch (this.question.referenceQuestionName) {
      case 'AGE':
        return this.registerService.createdUser().age === +answer.responseValue;
      case 'CHILDREN':
        return this.registerService.createdUser().children === +answer.responseValue;
      case 'MARITAL_SITUATION':
        return this.registerService.createdUser().maritalSituation === answer.responseValue;
      case 'NET_INCOME':
        return this.registerService.createdUser().salaryIncome === +answer.responseValue;
      case 'TAX_PER_YEAR':
        return this.registerService.createdUser().taxPerYear === +answer.responseValue;
    }

    return false;
  }
}
