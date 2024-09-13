import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from 'src/app/services/task.service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTaskService: any;

  const mockTasks = [
    {
      id: 1,
      title: 'Test Task 1',
      description: 'Test Description 1',
      completed: false,
      date: new Date(),
    },
    {
      id: 2,
      title: 'Test Task 2',
      description: 'Test Description 2',
      completed: true,
      date: new Date(),
    },
  ];

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj([
      'getTasks',
      'deleteTask',
      'updateTask',
    ]);
    mockTaskService.getTasks.and.returnValue(of(mockTasks));

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have tasks loaded from the service', () => {
    expect(component.tasks.length).toBe(2);
  });

  it('should delete a task', () => {
    component.deleteTask(1);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
  });

  it('should mark task as completed', () => {
    component.markAsCompleted(mockTasks[0]);
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(mockTasks[0]);
  });
});
