import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/Register/shared/auth-service.service';
import { Question } from 'app/Register/shared/question';
import { RegisterService } from 'app/Register/shared/register-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'clovis-create-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.sass'
})
export class CreatePasswordComponent {
  @Input({required: true}) question! : Question;
  @Input({required: true}) color! : string;
  @Output() accountCreated = new EventEmitter();

  password: string = "";
  confirmPassword: string = "";

  constructor(
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {}

  confirmPasswordHasAtLeast8Characters() : boolean {
    return this.password.length >= 8;
  }

  confirmPasswordHasAtLeast1Capital() : boolean {
    const regex = /[A-Z]/;
    return regex.test(this.password);
  }

  confirmPasswordHasAtLeast1Minuscule() : boolean {
    const regex = /[a-z]/;
    return regex.test(this.password);
  }

  confirmPasswordHasAtLeast1number() : boolean {
    const regex = /\d/;
    return regex.test(this.password);
  }

  confirmPasswordMatchToPassword() : boolean {
    return this.confirmPassword === this.password;
  }

  registerCustomer() {
    this.registerService.updateUserProperty('password', this.password);
    this.registerService.registerCustomer().subscribe({
      next: () => {
        this.toastr.success("Votre compte est crée !");
        this.accountCreated.emit();
        this.authService.login(this.registerService.createdUser().email, this.password).subscribe();
      },
      error: (error) => {
        console.log(error);
        debugger;
      }
    })
  }

}
