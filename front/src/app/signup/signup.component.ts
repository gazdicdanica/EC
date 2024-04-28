import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // isConfirmed: boolean = false;
  responseError: boolean = false;

  signUpFormOrganization = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, this.matchValidator('password', 'confirmPassword'));

  signUpFormIndividual = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, this.matchValidator('password', 'confirmPassword'));


  constructor(private router: Router, private authService: AuthService) {
  }

  signUpOrganization(): void {

    if (this.signUpFormOrganization.valid) {
      let form = this.signUpFormOrganization.value;
      this.authService.register(form.email!, form.password!).subscribe({
        next: () => {
          this.router.navigate(['']);
          alert('User registered successfully');
          
        },
        error: (error) => {
          this.responseError = true;
        }
      
      });
    }
  }
  
  signUpIndividual(): void {

    if (this.signUpFormIndividual.valid) {
      let form = this.signUpFormIndividual.value;
      this.authService.register(form.email!, form.password!).subscribe({
        next: () => {
          this.router.navigate(['']);
          alert('User registered successfully');
          
        },
        error: (error) => {
          this.responseError = true;
        }
      
      });
    }
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }
}
