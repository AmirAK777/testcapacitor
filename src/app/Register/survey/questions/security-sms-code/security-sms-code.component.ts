import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmsValidationService } from './sms-validation.service';
import { RegisterService } from 'app/Register/shared/register-service.service';
import { Question } from 'app/Register/shared/question';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'clovis-security-sms-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './security-sms-code.component.html',
  styleUrl: './security-sms-code.component.sass'
})
export class SecuritySmsCodeComponent implements OnInit {

  @Input({required: true}) question! : Question;
  @Input({required: true}) color! : string;
  @Output() validationCodeDone = new EventEmitter();

  currentRequestId: string | undefined;
  codeSms: string | undefined;

  constructor(private readonly smsValidationService: SmsValidationService,
    private readonly registerService: RegisterService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit() {
    this.sendSmsValidation();
  }

  sendSmsValidation() {
    this.smsValidationService.sendSmsValidation(
      this.registerService.createdUser().phoneNumber
    ).subscribe({
      next: (response: any) => {
        this.currentRequestId = response.request_id;
      },
      error: (err: any) => {
        console.error(err.error_text);
      }
    })
  }

  sendCodeValidation() {
    if (this.currentRequestId !== undefined && this.codeSms !== undefined) {
      this.smsValidationService.sendCodeValidation(
        this.currentRequestId, 
        this.codeSms, 
        this.registerService.createdUser().email)
        .subscribe({
          next: () => {
            this.toastr.success("Code validé");
            this.validationCodeDone.emit();
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  }

}
