import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
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

  // questions = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['Paris', 'London', 'Berlin'],
  //   },
  //   {
  //     question: 'What is the tallest mountain in the world?',
  //     options: ['Mount Everest', 'K2', 'Mount Kilimanjaro'],
  //   },
  //   {
  //     question: 'What is the largest ocean on Earth?',
  //     options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean'],
  //   },
  //   {
  //     question: 'What is the currency of Japan?',
  //     options: ['Japanese Yen (JPY)', 'Chinese Yuan (CNY)', 'South Korean Won (KRW)'],
  //   },
  //   {
  //     question: 'Who painted the Mona Lisa?',
  //     options: ['Leonardo da Vinci', 'Michelangelo', 'Vincent van Gogh'],
  //   },
  //   {
  //     question: 'What is the largest planet in our solar system?',
  //     options: ['Jupiter', 'Saturn', 'Earth'],
  //   },
  //   {
  //     question: 'In which year did World War II begin?',
  //     options: ['1939', '1914', '1945'],
  //   },
  //   {
  //     question: 'What is the chemical symbol for water?',
  //     options: ['H2O', 'CO2', 'NaCl'],
  //   },
  //   {
  //     question: 'How many bones are there in the adult human body?',
  //     options: ['Around 206 (estimates vary slightly)', '100', '300'],
  //   },
  //   {
  //     question: 'What is the name of the search engine you\'re currently using to ask me questions?',
  //     options: ['Bard', 'Bing', 'DuckDuckGo'],
  //   },];

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

  setBool(i: number) {

    if (Object.keys(this.questions[i]).length === 0 && this.questions[i].constructor === Object) {
      this.getQuestion(i);  
    }
  }

  finish() {}

}
