import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  addTaskForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      date: [new Date(), Validators.required],
      completed: [false],
    });
  }

  // // Add a new task
  // addTask(): void {
  //   if (this.addTaskForm.valid) {
  //     this.isSubmitting = true;
  //     const newTask: Task = {
  //       id: this.taskService.getTasks().length + 1,
  //       title: this.addTaskForm.value.title,
  //       description: this.addTaskForm.value.description,
  //       date: new Date(),
  //       completed: false,
  //     };

  //     this.taskService.addTask(newTask);
  //     this.isSubmitting = false;
  //     this.router.navigate(['/tasks']);
  //   }
  // }

  addTask(): void {
    if (this.addTaskForm.valid) {
      const newTask = this.addTaskForm.value;
      this.taskService.addTask(newTask); // Add the task using TaskService
      this.router.navigate(['/tasks']); // Navigate back to task list after adding
    }
  }
}
