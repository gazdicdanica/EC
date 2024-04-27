import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  all_lections = [
    {"course": "Math", "lectures": ["Algebra Basics", "Geometry Fundamentals", "Calculus Introduction"]},
    {"course": "History", "lectures": ["Ancient Civilizations", "World Wars", "Renaissance Era"]},
    {"course": "Programming", "lectures": ["Introduction to Python", "Web Development Essentials", "Object-Oriented Programming"]},
    {"course": "Physics", "lectures": ["Mechanics Principles", "Thermodynamics Overview", "Electromagnetism Basics"]},
    {"course": "Chemistry", "lectures": ["Atomic Structure", "Chemical Bonding", "Acid-Base Reactions"]},
    {"course": "Biology", "lectures": ["Cell Biology", "Genetics Overview", "Ecology Concepts"]},
    {"course": "Geography", "lectures": ["Physical Geography", "Human Geography", "Environmental Studies"]},
    {"course": "Literature", "lectures": ["Shakespearean Literature", "Modernist Novels", "Poetry Analysis"]},
    {"course": "Art", "lectures": ["Art History Overview", "Color Theory", "Sculpture Techniques"]}
  ];

  course: string = "";
  lections : String[] = [];
  selectedDifficulty: string = "easy";

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.course = params['course'];

      this.lections = this.all_lections.find(x => x.course === this.course)!.lectures;
    });
  }

}
