import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  all_lections = [
    { "course": "Math", "lectures": ["Algebra Basics", "Geometry Fundamentals", "Calculus Introduction", "Trigonometry Essentials", "Statistics Fundamentals", "Differential Equations", "Linear Algebra"] },
    { "course": "History", "lectures": ["Ancient Civilizations", "World Wars", "Renaissance Era", "Age of Exploration", "Industrial Revolution", "Colonialism and Imperialism", "Cold War Era"] },
    { "course": "Programming", "lectures": ["Introduction to Python", "Web Development Essentials", "Object-Oriented Programming", "Data Structures", "Algorithms Overview", "Software Engineering Principles", "Database Management"] },
    { "course": "Physics", "lectures": ["Mechanics Principles", "Thermodynamics Overview", "Electromagnetism Basics", "Quantum Mechanics", "Special Relativity", "Nuclear Physics", "Astrophysics"] },
    { "course": "Chemistry", "lectures": ["Atomic Structure", "Chemical Bonding", "Acid-Base Reactions", "Organic Chemistry", "Biochemistry Fundamentals", "Analytical Chemistry", "Polymer Chemistry"] },
    { "course": "Biology", "lectures": ["Cell Biology", "Genetics Overview", "Ecology Concepts", "Evolutionary Biology", "Human Anatomy", "Microbiology", "Neuroscience"] },
    { "course": "Geography", "lectures": ["Physical Geography", "Human Geography", "Environmental Studies", "Geopolitics", "Urban Planning", "Cultural Geography", "Remote Sensing"] },
    { "course": "Literature", "lectures": ["Shakespearean Literature", "Modernist Novels", "Poetry Analysis", "Drama Studies", "Literary Theory", "Postcolonial Literature", "Fantasy and Science Fiction"] },
    { "course": "Art", "lectures": ["Art History Overview", "Color Theory", "Sculpture Techniques", "Painting Techniques", "Digital Art Fundamentals", "Printmaking", "Photography History and Techniques"] }
  ];



  course: string = "";
  lections: String[] = [];
  selectedDifficulty: string = "easy";

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    this.route.params.subscribe(params => {
      this.course = params['course'];

      this.lections = this.all_lections.find(x => x.course === this.course)!.lectures;
    });
  }

  startQuiz(lection: String) {
    console.log("Starting quiz for " + lection + " with difficulty " + this.selectedDifficulty);
    this.router.navigate(['/quiz', this.course, lection, this.selectedDifficulty]);
  }

  back() {
    this.location.back();
  }

}
