import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    this.route.params.subscribe(params => {
      this.course = params['course'];
      this.lection = params['lection'];
      this.difficulty = params['difficulty'];
    });
  }

  course: string = "";
  lection: string = "";
  difficulty: string = "";

  isLoading: boolean = false;

  questions: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  stepControls: FormGroup[] = []; // Array of form controls
  feedback: string[] = [];
  answers: string[] = [];

  selectedAnswers : string[] = [];


  getQuestion(i: number) {
    this.isLoading = true;
    this.quizService.getQuestions(this.course ,this.lection, this.difficulty).subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      this.answers.push(data.answers[0]);
      data.answers.sort(() => Math.random() - 0.5); // Shuffle options
      this.questions[i] = data;


    });
  }

  ngOnInit() {
    this.selectedAnswers = new Array(this.questions.length).fill(-1);
    this.feedback = new Array(this.questions.length).fill('');
    this.questions.forEach((question) => {
      console.log("one more");
      const group = new FormGroup({
        answer: new FormControl(null, Validators.required) // Required to select an answer
      });
      this.stepControls.push(group);

    });
    this.getQuestion(0);
  }

  isAnswerCorrect(index: number): boolean {
    const control = this.stepControls[index].value.answer;
    return control!.valid && control!.value === this.answers[index];
  }

  onIndexChange(step: StepperSelectionEvent) {
    const newStepIndex = step.selectedIndex;
    if(Object.keys(this.questions[newStepIndex]).length === 0 && this.questions[newStepIndex].constructor === Object) {
      this.getQuestion(newStepIndex);
    }
  }

  cancel() {
    this.location.back();
  }

  finish() {}

}
