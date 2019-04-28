/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { completedTodoPath } from '@todo-app/app.routes';
import { TodoListService } from '@todo-app/core/todo-list/todo-list.service';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoListCompletedComponent } from '@todo-app/todo-list-completed/todo-list-completed.component';

describe('TodoListCompletedComponent', () => {
  let component: TodoListCompletedComponent;
  let fixture: ComponentFixture<TodoListCompletedComponent>;

  beforeEach(async(() => {
    const todo1 = new TODOItem('Buy milk', 'Remember to buy milk');
    todo1.completed = true;
    const todoList = [todo1, new TODOItem('Buy flowers', 'Remember to buy flowers')];

    TestBed.configureTestingModule({
      declarations: [TodoListCompletedComponent],
      imports: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: completedTodoPath },
        {
          provide: TodoListService,
          useValue: {
            todoList: todoList
          }
        }
      ]
    })
      .overrideTemplate(TodoListCompletedComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one completed TODO item', () => {
    expect(component.todoList.length).toBe(1);
  });
});
