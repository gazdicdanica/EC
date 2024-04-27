import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isConfirmed: boolean = false;
  responseError: boolean = false;
  user = {
    email: "",
    name: "",
    surname: "",
    username: "",
    birthday: null,
    password: ""
  
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  maxDate: Date = new Date();

  constructor(private router: Router) {
    this.maxDate = new Date();
  }
  public ngOnInit() {
  }

  public signUp(): void {
    let form = this.signUpForm.value;
    this.user.email = form.email!;
    this.user.name = form.name!;
    this.user.surname = form.surname!;
    this.user.birthday = form.birthday!;
    this.user.password = form.password!;
    this.user.username = form.username!;

    console.log(this.user);


  }
}

