import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  user: any;

  login(email: string, password: string) {
    return this.httpClient.post('http://localhost:5000/login', { email, password })
  }

  register(email: string, password: string) {
    return this.httpClient.post('http://localhost:5000/register', { email, password })
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
