import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { Task } from '../../Task';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, MatFormField, MatLabel, MatIcon, FormsModule, ReactiveFormsModule, MatProgressSpinner, MatInputModule, MatButtonModule],

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  showButton = true;

  title = new FormControl('', { validators: () => { return { 'something': true } } });
  description = new FormControl();
  completed = new FormControl(false);

  @Input() formOpenEvent: EventEmitter<void> | undefined;
  @Output() submitEvent: EventEmitter<Task> = new EventEmitter();

  mode: string = 'create';
  task: Task = null;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    this.mode = data.mode;
    this.task = data.task;
  }

  ngOnInit(): void {
    if (this.task != null) {
      this.title = new FormControl(this.task.title, { validators: () => { return { 'something': true } } });
      this.description = new FormControl(this.task.description);
      this.completed = new FormControl(this.task.completed);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormOpen() {
    console.log('formopenevent');
  }

  onFormSubmit(mode: string): void {
    if (this.title.value == null || this.title.value.length == 0) {
      this.showSnackbar("Title is required", "Okay");
    } else {
      this.showButton = false;
      if (mode == 'edit') {
        this.task = {
          id: this.task.id,
          title: this.title.value,
          description: this.description.value,
          completed: this.completed.value
        }
        this.dataService.updateTask(this.task.id.toString(), this.task).subscribe(response => {
          if (response.status >= 200) {
            console.log('Task updated');
            this.showSnackbar('Task updated successfully', 'Okay');
            this.dialogRef.close();
          } else {
            console.error('Failed to update task', response.statusText);
          }
        }, error => {
          this.showButton = true;
          console.error('Error updating task', error);
        })
      } else if (mode == 'create') {
        const task = {
          id: 0,
          title: this.title.value,
          description: this.description.value,
          completed: this.completed.value
        };
        this.dataService.addTask(task).subscribe(response => {
          this.showButton = true;
          if (response.status >= 200) {
            this.showSnackbar('Task added successfully', 'Okay');
            this.dialogRef.close();
          } else {
            console.error('Failed to add task', response.statusText);
          }
        }, error => {
          this.showButton = true;
          console.error('Error adding task', error);
        });
      }
    }
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
