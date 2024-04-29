import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LamaServiceService } from '../services/lama-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-generate-questions',
  templateUrl: './generate-questions.component.html',
  styleUrls: ['./generate-questions.component.css']
})
export class GenerateQuestionsComponent {
  textInput = '';
  questions: any[] = [];
  question_answers: any[] = [];
  counter = 0;
  isLoading: boolean = false;

  @ViewChild('containerDiv') containerDiv!: ElementRef;

  constructor(private lamaService: LamaServiceService, private renderer: Renderer2, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.counter = 0;
  }

  textControl = new FormControl('', [Validators.required]);

  submitText() {
    if (this.textControl.invalid) {
      this.snackBar.open('Please enter a topic', 'Close', { duration: 3000 }); 

      return;
    }
    this.isLoading = true;
    this.lamaService.generateQuestions(this.textControl.value!, "medium", 5).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.questions = response.questions;
        this.isLoading = false;
        if (!response.questions) {
          this.snackBar.open('No questions found for this topic', 'Close', { duration: 3000 }); 
          return;
        }
        this.addBlocks(response.questions);
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  handleClick(objectId: number, answer: string) {
    console.log('Clicked:', objectId);
    this.isLoading = true;
    if (answer === '') {
      this.snackBar.open('Please enter an answer', 'Close', { duration: 3000 });
      this.isLoading = false;
      return;
    }
    this.counter += 1;
    this.lamaService.checkAnswerForTopic(this.questions[objectId], answer).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.isLoading = false;
        this.question_answers.push({ answer: answer, question: this.questions[objectId] });
        if (this.counter === this.questions.length) {
          this.addReportButton();
        }
        if (response.correct_json && response.answer) {
          this.snackBar.open('Correct answer', 'Close', { duration: 3000 }); 

        } else {
          this.snackBar.open('Incorrect answer', 'Close', { duration: 3000 }); 

        }
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Close', { duration: 3000 }); 
        this.isLoading = false;
      }
    });
  }
  

  addReportButton() {
    console.log(this.question_answers);
    this.isLoading = true;
    this.lamaService.analyzeTest(this.question_answers).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.isLoading = false;
        this.dialog.open(DialogComponent, {
          data: response
        });
        this.router.navigate(['/askNQuestion']);
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Close', { duration: 3000 }); 
        this.isLoading = false;
      }
    });
  }

  addBlocks(data: any) {
    // for (let i = 0; i < data.length; i++) {
    //   const label = this.renderer.createElement('label');
    //   this.renderer.setProperty(label, 'textContent', data[i]);

    //   const input = this.renderer.createElement('input');
    //   this.renderer.setAttribute(input, 'id', "input-" + i.toString());
    //   const answerControl = new FormControl('', [Validators.required]);

    //   const button = this.renderer.createElement('button');
    //   this.renderer.setAttribute(button, 'id', i.toString());
    //   this.renderer.setProperty(button, 'textContent', 'Check');
    //   this.renderer.listen(button, 'click', () => {
    //     this.handleClick(i, answerControl);
    //   });

    //   const divRow = this.renderer.createElement('div');
    //   this.renderer.addClass(divRow, 'row');
    //   this.renderer.appendChild(divRow, label);
    //   this.renderer.appendChild(divRow, input);
    //   this.renderer.appendChild(divRow, button);
    //   this.renderer.appendChild(this.containerDiv.nativeElement, divRow);

      const hide1 = document.getElementById('input-cont');
      const hide2 = document.getElementById('big-submit');
      if (hide1) {
        hide1.style.display = 'none';
      }

      if (hide2) {
        hide2.style.display = 'none';
      }
    }
  // }
}
