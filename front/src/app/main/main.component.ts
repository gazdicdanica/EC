import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private router: Router){}

  edu_list = [
    {"name": "Math", "color": "#1976D2"},   // Blue
    {"name": "History", "color": "#388E3C"}, // Green
    {"name": "Programming", "color": "#0277BD"}, // Light Blue
    {"name": "Physics", "color": "#689F38"}, // Light Green
    {"name": "Chemistry", "color": "#0097A7"}, // Cyan
    {"name": "Biology", "color": "#00796B"}, // Teal
    {"name": "Geography", "color": "#004D40"}, // Dark Cyan
    {"name": "Literature", "color": "#37474F"}, // Blue Grey
    {"name": "Art", "color": "#455A64"} // Blue Grey Darken 2
];

  redirect(name: String) {
    this.router.navigate(["course", name]);
  }
}
