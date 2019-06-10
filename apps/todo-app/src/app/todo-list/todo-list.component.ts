import { Component, OnInit } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public selectedTodo$ = this.todoListSandboxService.selectedTodo$;
  public todoList$ = this.todoListSandboxService.todoList$;
  public isLoading$ = this.todoListSandboxService.isLoading$;
  public duedateTodayCount$ = this.todoList$.pipe(
    map((todoList) => todoList.filter((todoItem) => this.isToday(todoItem.dueDate)).length)
  );

  constructor(private todoListSandboxService: TodoListSandboxService) {}

  public ngOnInit(): void {}

  public deleteTodo(id: string) {
    this.todoListSandboxService.deleteTodo(id);
  }

  public selectTodoForEdit(todoItem: TODOItem) {
    this.todoListSandboxService.selectTodoForEdit(todoItem);
  }

  public todoCompleteToggled(todoId: string) {
    this.todoListSandboxService.todoCompletedToggled(todoId);
  }
  private isToday(someDate) {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }
}
