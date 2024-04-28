import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  isLoading: boolean = false;

  // questions: any[] = new Array(10);

  questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin'],
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Mount Kilimanjaro'],
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean'],
    },
    {
      question: 'What is the currency of Japan?',
      options: ['Japanese Yen (JPY)', 'Chinese Yuan (CNY)', 'South Korean Won (KRW)'],
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Michelangelo', 'Vincent van Gogh'],
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Jupiter', 'Saturn', 'Earth'],
    },
    {
      question: 'In which year did World War II begin?',
      options: ['1939', '1914', '1945'],
    },
    {
      question: 'What is the chemical symbol for water?',
      options: ['H2O', 'CO2', 'NaCl'],
    },
    {
      question: 'How many bones are there in the adult human body?',
      options: ['Around 206 (estimates vary slightly)', '100', '300'],
    },
    {
      question: 'What is the name of the search engine you\'re currently using to ask me questions?',
      options: ['Bard', 'Bing', 'DuckDuckGo'],
    },];

  stepControls: FormGroup[] = []; // Array of form controls
  feedback: string[] = [];
  answers: string[] = [];

  selectedAnswers : string[] = [];

  answerChecked: boolean = false;

  ngOnInit() {
    this.selectedAnswers = new Array(this.questions.length).fill(-1);
    this.feedback = new Array(this.questions.length).fill('');
    this.questions.forEach((question) => {
      const group = new FormGroup({
        answer: new FormControl(null, Validators.required) // Required to select an answer
      });
      this.stepControls.push(group);
      this.answers.push(question.options[0]);
      question.options.sort(() => Math.random() - 0.5); // Shuffle options

    });
  }

  isAnswerCorrect(index: number): boolean {
    const control = this.stepControls[index].value.answer;
    return control!.valid && control!.value === this.answers[index];
  }

  checkAnswer(i: number, e: Event) {
    e.preventDefault();
    this.answerChecked = true;
    if(this.stepControls[i].valid){
      this.selectedAnswers[i] = this.stepControls[i].value.answer;

      if (this.isAnswerCorrect(i)) {
        this.feedback[i] = 'Correct!';
        this.setColor(i, 'green'); // Set correct answer green
        console.log('Correct!');
      } else {
        this.feedback[i] = 'Incorrect!';
        this.setColor(i, 'red'); // Set wrong answer red
        console.log('Incorrect!');
      }
    }
  }

  setBool() {
    this.answerChecked = false;
  }

  setColor(index: number, color: string) {
    const radioElements = document.querySelectorAll(`mat-step:nth-child(${index + 1}) mat-radio-group mat-radio-button`);
    radioElements.forEach(element => {
      element.querySelector<HTMLElement>('.mat-radio-label-content')!.style.color = color;
    });
  }

}
