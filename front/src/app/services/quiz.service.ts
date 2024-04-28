import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getQuestions(course: string, lection: string, difficulty: string) {
    return this.http.post(`http://localhost:5000/question`, {course: course, module: lection, difficulty: difficulty, email: localStorage.getItem('email')});
  }
}
