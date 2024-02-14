import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-finish-task',
  templateUrl: './finish-task.component.html',
  styleUrl: './finish-task.component.scss'
})
export class FinishTaskComponent {
@Input() finish: any;
@Input() taskArray: any;

doUnfinish(i: number) {
  const taskToMove = this.finish.splice(i, 1)[0];
  this.taskArray.push(taskToMove);
  this.saveDataToLocalStorage();
}

 // Save data to local storage
 saveDataToLocalStorage() {
  localStorage.setItem('taskArray', JSON.stringify(this.taskArray));
  localStorage.setItem('finishTask', JSON.stringify(this.finish));
}
}
