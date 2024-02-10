import { Component, OnInit } from '@angular/core';

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

  // Load data from local storage when the component initializes
  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  addTask(name: string, taskDate: string) {
    const newName = name.replace(/\s+/g, '');
    const newNameWithSpace = name.charAt(0).toUpperCase() + name.slice(1);
    const newDate = taskDate.trim();

    const currentDate = new Date();
    const selectedDate = new Date(newDate);

    if (selectedDate < currentDate) {
      // Date is in the past, show an error message or take appropriate action
      alert('Please select a date in the present or future.');
      return;
    }

    if (this.edit !== null) {
      this.taskArray[this.edit] = { name: newName, taskDate: newDate };
      this.edit = null;
    } else {
      if (newName.length <= 0) {
        this.message = 'Please enter task name.';
      } else if (newDate.length <= 0) {
        this.message = 'Please enter task date.';
      } else if(newName.length > 10){
        this.message = 'Task should be between 1 to 10 character.';
      }else{
        
        console.log("digit",newName.length)
        const newTask = { name: newNameWithSpace, taskDate: newDate };
        this.taskArray.push(newTask);
        this.saveDataToLocalStorage();
        this.taskName = ''; // Clear input field
        this.taskDate = ''; // Clear input field
        this.message = '';
        alert('Task added successfully');
      }
    }
  }

  editTask(i: number) {
    this.edit = i;
    console.log("i", this.edit)
    this.taskName = this.taskArray[i].name;
    this.taskDate = this.taskArray[i].taskDate;
  }

  deleteTask(index: number) {
    this.taskArray.splice(index, 1);
    this.saveDataToLocalStorage();
  }

  doFinish(i: number) {
    const taskToMove = this.taskArray.splice(i, 1)[0];
    this.finishTask.push(taskToMove);
    this.saveDataToLocalStorage();
  }

  doUnfinish(i: number) {
    const taskToMove = this.finishTask.splice(i, 1)[0];
    this.taskArray.push(taskToMove);
    this.saveDataToLocalStorage();
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
