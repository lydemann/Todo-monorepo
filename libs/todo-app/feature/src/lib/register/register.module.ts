import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';

@NgModule({
	imports: [
		CommonModule,
		RegisterRoutingModule,
		SharedModule,
		ReactiveFormsModule,
	],
	declarations: [RegisterComponent],
})
export class RegisterModule {}
