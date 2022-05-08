/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { mockProvider } from '@ngneat/spectator/jest';
import {
	TranslateDirective,
	TranslatePipe,
	TranslateService,
} from '@ngx-translate/core';
import { TextareaComponent } from '@todo/shared/ui';
import { MockComponent, MockDirectives, MockPipe } from 'ng-mocks';
import { of } from 'rxjs';

const declarations = [
	MockComponent(TextareaComponent),
	MockDirectives(TranslateDirective),
	MockPipe(TranslatePipe, () => 'translated text'),
];

@NgModule({
	declarations: [...declarations],
	imports: [],
	exports: [...declarations],
	providers: [mockProvider(TranslateService, { get: () => of('Some text') })],
})
export class TestingModule {}
