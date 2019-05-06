import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(translate: TranslateService, private todoListSandboxService: TodoListSandboxService) {
    translate.addLangs(['en', 'da']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|da/) ? browserLang : 'en');
  }
  public ngOnInit(): void {
    this.todoListSandboxService.loadTodoList();
  }
}
