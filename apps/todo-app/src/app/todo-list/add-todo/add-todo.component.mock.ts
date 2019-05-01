import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export class AddTodoComponentMock implements OnInit {
  public isLoading = false;

  @Input()
  public currentTODO;

  constructor() {}

  public ngOnInit() {}

  public save() {}
}
