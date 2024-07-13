import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../Task';
import { title } from 'process';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DataService } from '../../data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, MatTableModule, MatButtonModule, MatIcon, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  displayColumns: string[] = ['id', 'title', 'description', 'actions'];

  @Input() task: Task;

  constructor(private dataService: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.dataService.tasks$.subscribe((data) => {
      this.tasks = data;
    });
  }

  updateTask(task: Task) {
    this.dataService.updateTask(task.id.toString(), task).subscribe(() => {
      this.loadItems();
    });
  }

  deleteTask(task: Task) {
    this.dataService.deleteItem(task.id.toString()).subscribe(response => {
      if (response.status >= 200) {
        console.log('Task deleted');
        this.showSnackbar('Task deleted', 'Okay');
        this.loadItems();
      } else {
        console.error('Failed to delete task', response.statusText);
      }
    });
  }

  openAddTaskForm(editMode: boolean = false, task: Task = null) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { mode: editMode ? 'edit' : 'create', task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  showSnackbar(content: string, action: string) {
    let sb = this.snackBar.open(content, action, {
      duration: 1500
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    })
  }

}
