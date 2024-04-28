import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  feedback: string = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router:Router) {
      this.feedback  = data.test_results;
    }

    onNoClick(): void {
      this.router.navigate(['/home']);

    }
}
