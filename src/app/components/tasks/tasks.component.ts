import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../Task';
import { title } from 'process';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, MatTableModule, MatButtonModule, MatIcon],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  displayColumns: string[] = ['id', 'title', 'description', 'completed', 'actions'];

  constructor() {
    this.tasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum!",
        completed: true
      },
      {
        id: 2,
        title: "Task 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo tenetur assumenda fugit quia?",
        completed: false
      },
      {
        id: 3,
        title: "Task 3",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum qui alias facilis minima modi, eligendi dicta!",
        completed: true
      },
      {
        id: 4,
        title: "Task 4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem veniam, vitae nemo distinctio beatae! Rem expedita esse ipsam incidunt hic?",
        completed: false
      },
    ];
  }

  ngOnInit(): void {
    
  }

}
