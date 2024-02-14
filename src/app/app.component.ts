import { Component, OnInit } from '@angular/core';
import { PopUpFormComponent } from './pop-up-form/pop-up-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  taskArray: any[] = [];
  finishTask: any[] = [];
  edit: any | null = null;
  message: any;
  taskName: string = '';
  taskDate: string = '';
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
      width: '250px',
      data: { taskName: 'Initial Task Name', taskDate: new Date() },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Task Name:', result.taskName);
      console.log('Task Date:', result.taskDate);
    });
  }

  updateData(item: string) {
    console.log("value", item);
    this.edit = item;
    this.taskName = this.taskArray[this.edit].name;
    this.taskDate = this.taskArray[this.edit].taskDate;
    this.isEditing = true;
  }
  resetForm() {
    this.isEditing = false;
    this.edit = null;
    this.taskName = '';
    this.taskDate = '';
  }

  addToUpdate(text: string) {
    console.log("test", text)

  }

  // addTask(name: string, taskDate: string) {
  //   const newName = name.replace(/\s+/g, '');
  //   const newNameWithSpace = name.charAt(0).toUpperCase() + name.slice(1);
  //   const newDate = taskDate.trim();

  //   const currentDate = new Date();
  //   const selectedDate = new Date(newDate);

  //   if (selectedDate < currentDate) {
  //     // Date is in the past, show an error message or take appropriate action
  //     alert('Please select a date in the present or future.');
  //     return;
  //   }

  //   if (this.edit !== null) {
  //     if (newName.length <= 0) {
  //       this.message = 'Please enter task name.';
  //     } else if (newDate.length <= 0) {
  //       this.message = 'Please enter task date.';
  //     } else if (newName.length > 10) {
  //       this.message = 'Task should be between 1 to 10 character.';
  //     } else {
  //       this.taskArray[this.edit] = { name: newNameWithSpace, taskDate: newDate };
  //       console.log("check", this.taskArray)
  //       this.edit = null;
  //       this.taskName = ''; // Clear input field
  //       this.taskDate = ''; // Clear input field
  //       this.message = '';
  //       this.saveDataToLocalStorage();
  //       alert('Task updated successfully');
  //     }
  //   } else {
  //     if (newName.length <= 0) {
  //       this.message = 'Please enter task name.';
  //     } else if (newDate.length <= 0) {
  //       this.message = 'Please enter task date.';
  //     } else if (newName.length > 10) {
  //       this.message = 'Task should be between 1 to 10 character.';
  //     } else {

  //       console.log("digit", newName.length)
  //       const newTask = { name: newNameWithSpace, taskDate: newDate };
  //       this.taskArray.push(newTask);
  //       this.saveDataToLocalStorage();
  //       this.taskName = ''; // Clear input field
  //       this.taskDate = ''; // Clear input field
  //       this.message = '';
  //       alert('Task added successfully');
  //       taskDate
  //     }
  //   }
  //   this.isEditing= false;
  // }

  // editTask(i: number) {
  //   this.edit = i;
  //   console.log("i", this.edit)
  //   this.taskName = this.taskArray[i].name;
  //   this.taskDate = this.taskArray[i].taskDate;
  // }

  // deleteTask(index: number) {
  //   this.taskArray.splice(index, 1);
  //   this.saveDataToLocalStorage();
  // }

  // doFinish(i: number) {
  //   const taskToMove = this.taskArray.splice(i, 1)[0];
  //   this.finishTask.push(taskToMove);
  //   this.saveDataToLocalStorage();
  // }

  // doUnfinish(i: number) {
  //   const taskToMove = this.finishTask.splice(i, 1)[0];
  //   this.taskArray.push(taskToMove);
  //   this.saveDataToLocalStorage();
  // }

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
