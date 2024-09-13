import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  editTaskForm!: FormGroup;
  tasks: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.tasks = this.taskService.getTasks();
    this.tasks = this.tasks.find((task: any) => task.id === parseInt(taskId!));

    this.editTaskForm = this.fb.group({
      title: [this.tasks.title, [Validators.required, Validators.minLength(3)]],
      description: [this.tasks.description, Validators.maxLength(200)],
      date: [this.formatDate(this.tasks.date), Validators.required],
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  updateTask(): void {
    if (this.editTaskForm.valid) {
      const updatedTask = {
        ...this.tasks,
        ...this.editTaskForm.value,
      };
      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/tasks']);
    }
  }
}
