import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Answer } from 'app/Register/shared/answer';

@Component({
  selector: 'clovis-answer-multi-chooses',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule ],
  templateUrl: './answer-multi-chooses.component.html',
  styleUrl: './answer-multi-chooses.component.sass'
})
export class AnswerMultiChoosesComponent {
  @Input({required: true}) answer!: Answer;
  @Input({required: true}) color!: string;
  @Input() isSelected: boolean = false;
  @Output() answerTriggered = new EventEmitter<string | number>()

  constructor() {  }

  sendAnswer(response : string | number) {
    this.answerTriggered.emit(response);
  }
}
