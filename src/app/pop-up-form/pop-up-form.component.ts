import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pop-up-form',
  templateUrl: './pop-up-form.component.html',
  styleUrl: './pop-up-form.component.scss',
})
export class PopUpFormComponent {
  [x: string]: any;
  taskNameError: string = '';
  taskDateError: string = '';
  currentDate: Date = new Date(); // Get the current date
  isEditing: boolean = false; // Initialize isEditing flag
  isEditingHeading: boolean = false; // Initialize isEditingHeading flag
  constructor(public dialogRef: MatDialogRef<PopUpFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
      this.isEditing = data.isEditing || false; // Set isEditing flag from dialog data
      this.isEditingHeading = data.isEditingHeading || false; // Set isEditingHeading flag from dialog data
     }

  // closeDialog(): void {
  // this.dialogRef.close(this.data);
  // }



  closeDialog(): void {
    // Trim leading and trailing spaces and split the taskName into words
    const words = this.data.taskName.trim().split(/\s+/);
    
    // Capitalize the first letter of the first word and join the rest of the words with a single space
    const capitalizedTaskName = words.length > 0 ?
        words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join(' ') :
        '';

    const taskNameLength = capitalizedTaskName.replace(/\s/g, '').length; // Count length without spaces

    if (taskNameLength <= 10 && this.data.taskDate && this.data.taskName.trim()) {
        console.log('All fields are filled, and taskName has at least 10 characters.');
        this.data.taskName = capitalizedTaskName; // Assign capitalized taskName back to data
        this.dialogRef.close(this.data);
    } else {
        if (!this.data.taskName.trim()) {
            this.taskNameError = 'Task Name is required';
        } else if (taskNameLength > 10) {
            this.taskNameError = 'Max 10 characters';
        } else {
            this.taskNameError = '';
        }
      
        if (!this.data.taskDate) {
            this.taskDateError = 'Task Date is required';
        } else {
            this.taskDateError = '';
        }
    }
}

}
