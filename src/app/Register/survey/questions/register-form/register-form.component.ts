import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Question } from 'app/Register/shared/question';
import { RegisterService } from 'app/Register/shared/register-service.service';
import { RegisteredUser } from 'app/Register/shared/registeredUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'clovis-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Input({ required: true }) question!: Question;
  @Input({ required: true }) color!: string;

  @Output() registerFormCompleted = new EventEmitter();

  userCopy: RegisteredUser;

  constructor(
    public registerService: RegisterService,
    private toastr: ToastrService) {
      this.userCopy = { ...this.registerService.createdUser() };
  }

  registerCustomer() {
    this.registerService.updateUserProperty('firstName', this.userCopy.firstName);
    this.registerService.updateUserProperty('lastName', this.userCopy.lastName);
    this.registerService.updateUserProperty('email', this.userCopy.email);
    this.registerService.updateUserProperty('phoneNumber', this.userCopy.phoneNumber);
    this.registerService.updateUserProperty('zipCode', this.userCopy.zipCode);

    this.registerService.createCustomer().subscribe({
      next: () => {
        this.registerFormCompleted.emit();
      },
      error: (err) => {
        if (err.error.title === 'Customers.Conflict') {
          this.toastr.error('L\'adresse email existe déjà !');
        }
        else {
          this.toastr.error('Une erreur est survenue. Veuillez contacter le support.');
        }
      }
    });
  }
}
