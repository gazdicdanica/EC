import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LamaServiceService {

  constructor(private httpClient: HttpClient) { }

  askQuestion(question: string, generalization_coefficient: string): Observable<any> {
    return this.httpClient.post('http://localhost:5000/get_answer_for_my_question', { question, generalization_coefficient })
  }

  generateQuestions(topic: string, difficulty: string, num: number): Observable<any> {
    return this.httpClient.post('http://localhost:5000/ask_me_about_topic', { topic, difficulty, num})
  }

  checkAnswerForTopic(question: string, answer: string): Observable<any> {
    return this.httpClient.post('http://localhost:5000/check_answer_for_topic', { question, answer})
  }

  analyzeTest(questionAnswerDatamap: any): Observable<any> {
    return this.httpClient.post('http://localhost:5000/analyze_test', {questionAnswerDatamap})
  }
}
