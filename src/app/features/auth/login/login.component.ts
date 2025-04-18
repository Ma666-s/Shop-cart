import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage = signal("");
  isLoading = signal<boolean>(false); 
  private authService = inject(AuthService)
  private router = inject(Router)
  

  loginForm : FormGroup = new FormGroup({    
    email :  new FormControl(null, [Validators.required, Validators.email]),
    password :  new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),
  })
  loginSubmit()
    {
      if(this.loginForm.valid)
      {
        this.isLoading.set(true) 
        this.authService.sendDataUserLoginToApi(this.loginForm.value).subscribe({
          next : (res) => {
            this.isLoading.set(true)
            if(res.message == 'success')
            {
              localStorage.setItem('userToken', res.token)
              this.authService.sendDataToken()
              this.router.navigate(['/home'])
            }
            console.log(res)
          }
        })
      }
    }
}
