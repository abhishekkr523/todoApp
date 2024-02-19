import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
    selector: 'app-pop-up-form',
    templateUrl: './pop-up-form.component.html',
    styleUrl: './pop-up-form.component.scss',
})
export class PopUpFormComponent {
    [x: string]: any;
    taskNameError: string = '';
    taskDateError: string = '';
    taskImageError: string = '';
    currentDate: Date = new Date(); // Get the current date
    isEditing: boolean = false; // Initialize isEditing flag
    isEditingHeading: boolean = false; // Initialize isEditingHeading flag


    constructor(public dialogRef: MatDialogRef<PopUpFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
        this.isEditing = data.isEditing || false; // Set isEditing flag from dialog data
        this.isEditingHeading = data.isEditingHeading || false; // Set isEditingHeading flag from 
    }

    // closeDialog(): void {
    // this.dialogRef.close(this.data);
    // }



    closeDialog(): void {
        console.log("ok", this.data.taskImage)
        const date = moment();
        const currentDate = date.format('YYYY-MM-DD');
        // const currentDate = new Date(); // Get the current date
        const selectedDate = moment(this.data.taskDate, 'YYYY-MM-DD');
        // const selectedDate = new Date(this.data.taskDate); // Convert the selected date string to Date object

        // Check if the selected date is before the current date
        if (moment(selectedDate).isBefore(currentDate)) {
            this.taskDateError = 'Please select a present or future date';
            console.log("sms", selectedDate, currentDate)
        } else {
            // Trim leading and trailing spaces and split the taskName into words
            const words = this.data.taskName.trim().split(/\s+/);

            // Capitalize the first letter of the first word and join the rest of the words with a single space
            const capitalizedTaskName = words.length > 0 ?
                words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join(' ') :
                '';

            const taskNameLength = capitalizedTaskName.replace(/\s/g, '').length; // Count length without spaces

            if (taskNameLength <= 10 && this.data.taskDate && this.data.taskName.trim() && this.data.taskImage) {
                console.log('All fields are filled, and taskName has at least 10 characters.');
                this.data.taskName = capitalizedTaskName; // Assign capitalized taskName back to data
                this.dialogRef.close(this.data);
            } else {
                if (!this.data.taskName.trim()) {
                    this.taskNameError = 'Valid task Name is required';
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

                if (!this.data.taskImage) {
                    this.taskImageError = 'Image is required.';
                } else {
                    this.taskImageError = ''; // Reset taskImageError if image is selected
                }
            }
        }
    }

    handleFileInput(event: any): void {
        const file: File = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png','image/svg+xml']; // Allowed image types
    
        // Check if the file type is allowed
        if (allowedTypes.includes(file.type)) {
            const reader = new FileReader();
    
            // Handle file load event
            reader.onload = (e: any) => {
                this.data.taskImage = e.target.result; // Set the data.taskImage to the base64 string
            };
    
            // Read the file as a data URL (base64 string)
            reader.readAsDataURL(file);
            this.taskImageError = ''; // Reset the task image error if file is valid
        } else {
            // Set error message for invalid file type
            this.taskImageError = 'Only JPG, PNG and SVG images are allowed.';
            // Reset taskImage to prevent displaying invalid image
            this.data.taskImage = '';
        }
    }
    


}
