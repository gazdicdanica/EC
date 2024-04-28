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


  constructor(private lamaService: LamaServiceService) {}

  submitText() {
    if(this.textInput === '') this.textInput = "Tell me a programming joke";
    this.lamaService.askQuestion(this.textInput, "").subscribe((res: any) => {
      this.resp = res;
      console.log('Response:', res);
      // this.addBlock()
    });
  }

  addBlock() {
    const containerDiv = document.getElementById('containerDiv')!;

    const newElement = document.createElement('div');
    
    newElement.classList.add('input-container');
    
    containerDiv.appendChild(newElement);
  }

}
