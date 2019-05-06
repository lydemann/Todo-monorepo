import { Component, OnInit } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public selectedTodo$ = this.todoListSandboxService.selectedTodo$;
  public todoList$ = this.todoListSandboxService.todoList$;

  constructor(private todoListSandboxService: TodoListSandboxService) {}

  public ngOnInit(): void {}

  public deleteTodo(id: string) {
    this.todoListSandboxService.deleteTodo(id);
  }

  public selectTodoForEdit(todoItem: TODOItem) {
    this.todoListSandboxService.selectTodoForEdit(todoItem);
  }
}
