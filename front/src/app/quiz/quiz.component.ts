import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

interface Question {
  text: string;
  options: string[];
  answer: number; // Index of the correct answer (0-based)
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  isLoading: boolean = false;

  questions: any[] = [
    // Add your questions here
  ];
  selectedAnswers = [];
  correctAnswers = [];
  stepControls = [];
  feedback = [];

  constructor(private _formBuilder: FormBuilder) {}

  // ngOnInit() {
  //   this.questions.forEach((question, i) => {
  //     this.stepControls[i] = this._formBuilder.group({
  //       answer: ['', Validators.required]
  //     });
  //   });
  // }

  // checkAnswer(index: number) {
  //   if (this.selectedAnswers[index] === this.correctAnswers[index]) {
  //     this.feedback[index] = 'Correct!';
  //   } else {
  //     this.feedback[index] = 'Incorrect, try again.';
  //   }
  // }
}


