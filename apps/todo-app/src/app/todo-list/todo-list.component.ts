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
    map(
      (todoList) =>
        todoList.filter((todoItem) => todoItem.dueDate && this.isToday(todoItem.dueDate)).length
    )
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
  private isToday(todoDate) {
    let newTodoDate = todoDate;
    if (typeof todoDate === 'string') {
      newTodoDate = new Date(todoDate);
    }

    const today = new Date();
    return (
      newTodoDate.getDate() === today.getDate() &&
      newTodoDate.getMonth() === today.getMonth() &&
      newTodoDate.getFullYear() === today.getFullYear()
    );
  }
}
