import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
	public emailFormGroup: FormGroup;
	public nameFormGroup: FormGroup;
	public birthdayFormGroup: FormGroup;
	public isEditable = true;

	constructor(private _formBuilder: FormBuilder, private router: Router) {}

	public ngOnInit() {
		this.emailFormGroup = this._formBuilder.group({
			emailCtrl: ['', [Validators.required, Validators.email]],
		});
		this.nameFormGroup = this._formBuilder.group({
			firstNameCtrl: ['', Validators.required],
			lastNameCtrl: ['', Validators.required],
		});
		this.birthdayFormGroup = this._formBuilder.group({
			birthdateCtrl: ['', Validators.required],
		});
	}

	public saveForm(formGroup: FormGroup) {
		if (!formGroup.valid) {
			return;
		}

		// send form to BE
	}

	public register() {
		this.isEditable = false;
	}

	public continue() {
		this.router.navigate(['/']);
	}
}
