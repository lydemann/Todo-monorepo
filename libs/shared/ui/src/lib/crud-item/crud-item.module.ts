import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedUtilUtilI18nModule } from '@todo/shared/util-i18n';
import { CrudItemComponent } from './crud-item.component';

const exportedDeclarations = [CrudItemComponent];

@NgModule({
	declarations: [...exportedDeclarations],
	imports: [CommonModule, TranslateModule, SharedUtilUtilI18nModule],
	exports: exportedDeclarations,
	providers: [],
})
export class CrudItemModule {}
