import { NgModule } from '@angular/core';
import { mockProvider } from '@ngneat/spectator';
import {
	TranslateDirective,
	TranslatePipe,
	TranslateService,
} from '@ngx-translate/core';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { of } from 'rxjs';

import { TextareaComponent } from '@todo/shared/ui';

const declarations = [
	MockComponent(TextareaComponent),
	MockDirective(TranslateDirective),
	MockPipe(TranslatePipe, () => 'translated text'),
];

@NgModule({
	declarations: [...declarations],
	imports: [],
	exports: [...declarations],
	providers: [mockProvider(TranslateService, { get: () => of('Some text') })],
})
export class TestingModule {}
