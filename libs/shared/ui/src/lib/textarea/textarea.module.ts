import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../material/material.module';
import { TextareaComponent } from './textarea.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
	declarations: [TextareaComponent],
	exports: [TextareaComponent],
})
export class TextareaModule {}
