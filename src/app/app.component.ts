import { Component, OnInit } from '@angular/core';
import { PopUpFormComponent } from './pop-up-form/pop-up-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  taskArray: any[] = [];
  finishTask: any[] = [];
  taskName: string = '';
  taskDate: string = '';
  taskImage: any;
  minDate: any;
  isEditing: boolean = false;
  

  constructor(public dialog: MatDialog) {
    // Initialize minDate to the current date
    this.minDate = new Date().toISOString().split('T')[0];
  }
  // Load data from local storage when the component initializes
  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpFormComponent, {
      width: '350px', height: '460px',
      data: { taskName: this.taskName, taskDate: this.taskDate, taskImage: this.taskImage }, // Pass taskName and taskDate here
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result && (result.taskName || result.taskDate || result.taskImage)) {
        this.taskArray.push(result);
        this.saveDataToLocalStorage();
      }
    });
  }

  
  // Save data to local storage
  saveDataToLocalStorage() {
    localStorage.setItem('taskArray', JSON.stringify(this.taskArray));
    localStorage.setItem('finishTask', JSON.stringify(this.finishTask));
  }

  // Load data from local storage
  loadDataFromLocalStorage() {
    const storedTaskArray = localStorage.getItem('taskArray');
    const storedFinishTask = localStorage.getItem('finishTask');

    if (storedTaskArray) {
      this.taskArray = JSON.parse(storedTaskArray);
    }

    if (storedFinishTask) {
      this.finishTask = JSON.parse(storedFinishTask);
    }
  }

}
