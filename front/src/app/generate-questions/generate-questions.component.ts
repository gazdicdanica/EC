import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LamaServiceService } from '../services/lama-service.service';

@Component({
  selector: 'app-generate-questions',
  templateUrl: './generate-questions.component.html',
  styleUrl: './generate-questions.component.css'
})
export class GenerateQuestionsComponent {
  textInput = '';
  questions: any[] = [];
  question_answers: any[] = [];
  counter = 0;

  isLoading: boolean = false;
  @ViewChild('containerDiv') containerDiv: ElementRef = new ElementRef(null);

  constructor(private lamaService: LamaServiceService, private renderer: Renderer2) {}

  ngOnInit() {
    this.counter = 0;
  }
  
  submitText() {
    if(this.textInput === '') {
      alert("Please enter a topic");
      return;
    };
    this.isLoading = true;
    this.lamaService.generateQuestions(this.textInput, "medium", 2).subscribe({
      next: (response) => {
        
        console.log('Response:', response);
        this.questions = response.questions;
        this.isLoading = false;
        if(!response.questions) {
          alert("No questions found for this topic");
          return;
        }
        this.addBlocks(response.questions)
        },
        error: (error) => {
          this.isLoading = false;
        }
    });
  }

  handleClick(objectId: number) {
    console.log('Clicked:', objectId);
    this.isLoading = true;
    const temp = (document.getElementById('input-' + objectId.toString()) as HTMLInputElement).value;
    if(temp === '') {
      alert("Please enter an answer");
      return;
    }
    this.counter += 1;
    this.lamaService.checkAnswerForTopic(this.questions[objectId], temp).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.isLoading = false;
        this.question_answers.push({answer: temp, question: this.questions[objectId]})
        if(this.counter === this.questions.length) {
          this.addReportButton();
        }
        if(response.correct_json && response.answer) {
          alert("Correct answer!");
        } else {
          alert("Incorrect answer");
        }
      },
        error: (error) => {
          alert(error.message)
          this.isLoading = false;
        }
    });
  }

  addReportButton() {
    console.log(this.question_answers)
    this.lamaService.analyzeTest(this.question_answers).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.isLoading = false;
        alert(response.test_results)
      },
        error: (error) => {
          alert(error.message)
          this.isLoading = false;
        }
    });
  }

  addBlocks(data: any) {

    for (let i = 0; i < data.length; i++) {
      const label = this.renderer.createElement('label');
      this.renderer.setProperty(label, 'textContent', data[i]);
      this.renderer.setAttribute(label, 'id', "label-" + i.toString());

      const input = this.renderer.createElement('input');
      this.renderer.setAttribute(input, 'id', "input-" + i.toString());

      const button = this.renderer.createElement('button');
      this.renderer.setAttribute(button, 'id', i.toString());
      this.renderer.setProperty(button, 'textContent', 'Check');
      this.renderer.listen(button, 'click', () => {
        this.handleClick(i);
      });

      this.renderer.appendChild(this.containerDiv.nativeElement, label);
      this.renderer.appendChild(this.containerDiv.nativeElement, input);
      this.renderer.appendChild(this.containerDiv.nativeElement, button);
    }
    
    const hide1 = document.getElementById('input-cont');
    const hide2 = document.getElementById('big-submit');
    if (hide1) {
      hide1.style.display = 'none';
    }
    
    if (hide2) {
      hide2.style.display = 'none';
    }
  }
}
