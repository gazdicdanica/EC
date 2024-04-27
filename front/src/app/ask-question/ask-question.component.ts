import { Component } from '@angular/core';
import { LamaServiceService } from '../services/lama-service.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrl: './ask-question.component.css'
})
export class AskQuestionComponent {
  textInput = '';
  response: string | null = null;

  constructor(private lamaService: LamaServiceService) {}

  submitText() {
    this.lamaService.askQuestion(this.textInput, "").subscribe((res: string) => {
      this.response = res;
    });
  }

  onInput() {
    // Dynamic resizing of textarea (if needed)
  }

}
