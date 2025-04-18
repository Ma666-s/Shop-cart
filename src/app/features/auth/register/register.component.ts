import { Component, inject, signal, WritableSignal } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage = signal("");
isLoading = signal<boolean>(false); 
  private authService = inject(AuthService)
  private router = inject(Router)

  registerForm : FormGroup = new FormGroup({
    name :  new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email :  new FormControl(null, [Validators.required, Validators.email]),
    password :  new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),
    rePassword :  new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),
    phone :  new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  },this.confirmPassword)

  registerSubmit()
  {
    if(this.registerForm.valid)
    {
      this.isLoading.set(true) 
      this.authService.sendDataUserRegisterToApi(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message == 'success')
            {
              this.router.navigate(['/login'])
            }
        }
      })
    }
  }
  confirmPassword(cp : AbstractControl)
  {
    if(cp.get('password')?.value === cp.get('rePassword')?.value)
    {
      return null
    }
    else
    {
      return {'missMatched' : true}
    }
  }
}
