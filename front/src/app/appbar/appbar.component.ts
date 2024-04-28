import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.setUser(null);
    this.router.navigate([""]);
  }

  route(){
    this.router.navigate(["/home"]);
  }
  
  isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  generateQuestions(){
    this.router.navigate(["/askNQuestion"]);
  }

  askQuestion(){
    this.router.navigate(["/askQuestion"]);
  }

}
