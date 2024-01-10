import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoapp';
  taskArray: any[] = [];
  finishTask: any[] = [];
  edit: any | null = null;
  message: any;
  editedTodo: string = '';

  // Load data from local storage when the component initializes
  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  addTask(inputValue: any) {
    const newTask = inputValue.value.trim().charAt(0).toUpperCase() + inputValue.value.trim().slice(1);
    
    if (this.edit !== null) {
      // Update existing todo
      if (this.editedTodo.trim() !== '') {
        this.taskArray[this.edit] = push(newTask);
        this.edit = "";
        this.editedTodo = "";
        console.log("ss",this.taskArray[this.edit])
      }
    } else {

    
    if (newTask.length <= 0) {
      this.message = "Please enter task"
    }
    if (newTask.length > 10) {
      this.message = "please enter between 1 to 10 character";
    }
    if (newTask.length >= 1 && newTask.length <= 10) {
      this.taskArray.push(newTask);
      this.saveDataToLocalStorage();
      console.log(this.taskArray);
      inputValue.value = '';
      this.message = "";
      alert("Task added successfully")
    }
    }
  }

  editTask(i: any) {
    this.edit = i;
    console.log("hii", this.edit);
    this.editedTodo = this.taskArray[i];
    console.log(this.editedTodo)
  }


  deleteTask(index: any) {
    this.taskArray.splice(index, 1);
    this.saveDataToLocalStorage(); // Save data to local storage after deleting a task
  }

  doFinish(i: any) {
    const taskToMove = this.taskArray.splice(i, 1)[0];
    this.finishTask.push(taskToMove);
    this.saveDataToLocalStorage(); // Save data to local storage after moving a task to finishTask
  }

  doUnfinish(i: any) {
    const taskToMove = this.finishTask.splice(i, 1)[0];
    this.taskArray.push(taskToMove);
    this.saveDataToLocalStorage(); // Save data to local storage after moving a task from finishTask
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

function push(newTask: any): any {
  throw new Error('Function not implemented.');
}

