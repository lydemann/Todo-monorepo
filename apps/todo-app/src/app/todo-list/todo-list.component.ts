import { Component, OnInit } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  // TODO: current todo item i store
  public currentTODO: TODOItem = new TODOItem('', '');
  public todoList$ = this.todoListSandboxService.todoList$;

  constructor(private todoListSandboxService: TodoListSandboxService) {}

  public ngOnInit(): void {}

  public deleteTodo(id: string) {
    this.todoListSandboxService.deleteTodo(id);
  }

  // TODO: dispatch action
  public editTodo(todoItem: TODOItem) {
    this.currentTODO = todoItem;
  }
}
