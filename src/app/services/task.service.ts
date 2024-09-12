import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, Bread, Eggs',
      date: new Date(),
      completed: false,
    },
    {
      id: 2,
      title: 'Complete Angular project',
      description: 'Complete task manager app',
      date: new Date(),
      completed: true,
    },
    {
      id: 3,
      title: 'Play Cricket',
      description: 'tomorrow morning at 7am',
      date: new Date(),
      completed: true,
    },
    {
      id: 4,
      title: 'Read a book',
      description: 'Alchemist, Ikigai',
      date: new Date(),
      completed: true,
    },
  ];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
}
