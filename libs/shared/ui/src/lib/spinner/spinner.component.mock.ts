import { Component, Input, OnInit } from '@angular/core';
import { SpinnerComponent } from '@shared-lib/spinner/spinner.component';

@Component({
  selector: 'app-spinner',
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export class SpinnerComponentMock implements OnInit, SpinnerComponent {
  @Input() public message = '';

  constructor() {}

  public ngOnInit() {}
}
