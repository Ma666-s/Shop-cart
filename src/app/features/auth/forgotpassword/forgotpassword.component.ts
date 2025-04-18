import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgetPasswordComponent {
  // Converted to signals
  isLoading = signal(false);
  step = signal(0);
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private toasterService: ToastrService = inject(ToastrService)

  // Form groups remain the same (reactive forms)
  forgetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  resetCode = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
  });

  resetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),
  });

  loginSubmit1() {
    if (this.forgetPassword.valid) {
      this.isLoading.set(true);
      this.authService.forgetPasswordApi(this.forgetPassword.value).subscribe({
        next: (res) => {
          this.step.set(1);
          this.isLoading.set(false);
          console.log(res);
        }
      });
    }
  }

  loginSubmit2() {
    if (this.resetCode.valid) {
      this.isLoading.set(true);
      this.authService.resetCodeApi(this.resetCode.value).subscribe({
        next: (res) => {
          this.step.set(2);
          this.isLoading.set(false);
          console.log(res);
          
          // Copy email from forgetPassword to resetPassword
          if (this.forgetPassword && this.resetPassword) {
            const emailControl = this.forgetPassword.get('email');
            const resetEmailControl = this.resetPassword.get('email');

            if (emailControl && resetEmailControl) {
              resetEmailControl.patchValue(emailControl.value);
              resetEmailControl.markAsTouched();
              resetEmailControl.markAsDirty();
            }
          }
        }
      });
    }
  }

  loginSubmit3() {
    if (this.resetPassword.valid) {
      this.isLoading.set(true);
      this.authService.resetNewPasswordApi(this.resetPassword.value).subscribe({
        next: (res) => {
          this.step.set(1);
          this.isLoading.set(false);
          console.log(res);
          this.toasterService.success('Password has been reset successfully.', 'Forget Password')
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
