import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/interfaces/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    completed: false,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.newTask.title.trim()) {
      const newTaskId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((task) => task.id)) + 1
          : 1;
      this.newTask.id = newTaskId;
      this.taskService.addTask(this.newTask);
      this.newTask = {
        id: 0,
        title: '',
        description: '',
        date: new Date(),
        completed: false,
      };
    }
  }

  markAsCompleted(task: any): void {
    task.completed = !task.completed;
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  toggleCompletion(id: number): void {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
  }
}
