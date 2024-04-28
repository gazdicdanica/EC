import { Component } from '@angular/core';
import { LamaServiceService } from '../services/lama-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrl: './ask-question.component.css'
})
export class AskQuestionComponent {
  textInput = '';
  resp: any = null;
  responseItems: any[] = [{ isResponse: false, textInput: '', response: null }];

  isLoading: boolean = false;

  constructor(private lamaService: LamaServiceService) {}

  submitText() {
    if(this.textInput === '') this.textInput = "Tell me a programming joke";
    this.isLoading = true;
    this.lamaService.askQuestion(this.textInput, "").subscribe({
      next: (response) => {
        
      this.resp = response;
      console.log('Response:', response);
      
      this.isLoading = false;
      // this.addBlock()
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  addBlock() {
    const containerDiv = document.getElementById('containerDiv')!;

    const newElement = document.createElement('div');
    
    newElement.classList.add('input-container');
    
    containerDiv.appendChild(newElement);
  }

}
