import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  lection : string = "";
  percentage : number = 0;
  answers : string[] = [];
  selectedAnswers : string[] = [];
  questions : any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const data =  JSON.parse(params["data"]);
      this.lection = data.lection;
      this.questions = data.questions;
      this.answers = data.answers;
      this.selectedAnswers = data.selectedAnswers;
      this.percentage = this.calculatePercentage();
      console.log(data);


   });
  }

  calculatePercentage() : number {
    let correct = 0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] === this.selectedAnswers[i]) {
        correct++;
      }
    }
    return (correct / this.answers.length) * 100;
  }

}
