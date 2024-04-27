import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // isConfirmed: boolean = false;
  responseError: boolean = false;
  user = {
    email: "",
    password: ""
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, this.matchValidator('password', 'confirmPassword'));

  maxDate: Date = new Date();

  constructor(private router: Router) {
    this.maxDate = new Date();
  }
  public ngOnInit() {
  }

  public signUp(): void {

    if (this.signUpForm.valid) {
      let form = this.signUpForm.value;
      this.user.email = form.email!;
      this.user.password = form.password!;
      console.log(this.user);

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
