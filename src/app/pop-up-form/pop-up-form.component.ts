import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-pop-up-form',
  templateUrl: './pop-up-form.component.html',
  styleUrl: './pop-up-form.component.scss',
  // providers: [provideNativeDateAdapter()],
})
export class PopUpFormComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (!this.data) {
      this.data = { taskName: '', taskDate: null }; // Initializing data object if it's null or undefined
    }
  }
}
