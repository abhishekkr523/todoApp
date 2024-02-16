import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopUpFormComponent } from '../pop-up-form/pop-up-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-added-task',
  templateUrl: './added-task.component.html',
  styleUrl: './added-task.component.scss'
})
export class AddedTaskComponent {
  @Input() finish: any;
  @Input() taskArray: any;
  @Input() taskName: any
  @Input() taskDate: any

  constructor(public dialog: MatDialog) {

  }
  doFinish(i: number) {
    const taskToMove = this.taskArray.splice(i, 1)[0];
    this.finish.push(taskToMove);
    this.saveDataToLocalStorage();
  }

  deleteTask(index: number) {
    this.taskArray.splice(index, 1);
    this.saveDataToLocalStorage();
  }

  openDialog(i: number): void {
    const taskData = this.taskArray[i]; // Get the data of the task at index i
    
    const dialogRef = this.dialog.open(PopUpFormComponent, {
      width: '330px',height:'400px',
      data: { taskName: taskData.taskName, taskDate: taskData.taskDate ,isEditing: true,isEditingHeading: true},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && (result.taskName || result.taskDate)) {
        this.taskArray[i] = result;
        this.saveDataToLocalStorage();
      }
    });
  }
  

  // Save data to local storage
  saveDataToLocalStorage() {
    localStorage.setItem('taskArray', JSON.stringify(this.taskArray));
    localStorage.setItem('finishTask', JSON.stringify(this.finish));
  }


}
