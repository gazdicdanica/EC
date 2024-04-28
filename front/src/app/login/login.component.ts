import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading: boolean = false;

  credentialsError: boolean = false;

  login(): void {
    this.credentialsError = false

    if(this.loginForm.valid){
      this.isLoading = true;
      let form = this.loginForm.value;
      this.authService.login(form.email!, form.password!).subscribe({
        next: (response) => {
          this.authService.setUser(response);
          console.log('User logged in', response);
          this.router.navigate(['/home']);
          this.isLoading = false;
          
        },
        error: (error) => {
          this.credentialsError = true;
          this.isLoading = false;
        }
      })
    }
    
  }

}
