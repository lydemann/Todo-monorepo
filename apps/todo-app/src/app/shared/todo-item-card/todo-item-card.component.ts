import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';

@Component({
  selector: 'app-todo-item-card',
  templateUrl: './todo-item-card.component.html',
  styleUrls: ['./todo-item-card.component.scss']
})
export class TodoItemCardComponent implements OnInit {
  @Input() public todoItem: TODOItem;
  @Input() public readOnlyTODO: boolean;
  @Output() public todoDelete = new EventEmitter();
  @Output() public todoEdit = new EventEmitter();
  @Output() public todoCompleteToggled = new EventEmitter<string>();

  constructor() {}

  public ngOnInit() {}

  public completeClick() {
    this.todoCompleteToggled.emit(this.todoItem.id);
  }

  public deleteClick() {
    this.todoDelete.emit(this.todoItem.id);
  }

  public editClick() {
    this.todoEdit.emit(this.todoItem);
  }
}
