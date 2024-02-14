import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-added-task',
  templateUrl: './added-task.component.html',
  styleUrl: './added-task.component.scss'
})
export class AddedTaskComponent {
  @Input() finish: any;
  @Input() taskArray: any;
  @Input() edit: number | undefined
  @Input() taskName: any
  @Input() taskDate: any

  @Output() updateDataEvent= new EventEmitter<string>();
  @Output() addToUpdate= new EventEmitter<string>();

  doFinish(i: number) {
    const taskToMove = this.taskArray.splice(i, 1)[0];
    this.finish.push(taskToMove);
    this.saveDataToLocalStorage();
  }

  deleteTask(index: number) {
    this.taskArray.splice(index, 1);
    this.saveDataToLocalStorage();
  }

  editTask(i: number) {
    this.edit = i;
    console.log("i", this.edit)
    this.taskName = this.taskArray[i].name;
    this.taskDate = this.taskArray[i].taskDate;
  }

  // Save data to local storage
 saveDataToLocalStorage() {
  localStorage.setItem('taskArray', JSON.stringify(this.taskArray));
  localStorage.setItem('finishTask', JSON.stringify(this.finish));
}


}
