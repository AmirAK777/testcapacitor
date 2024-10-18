import { Component, Input } from '@angular/core';

@Component({
  selector: 'clovis-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.sass'
})
export class ProgressBarComponent {
  @Input({ required: true }) progress!: number;
  @Input({required: true}) color!: string;
}
