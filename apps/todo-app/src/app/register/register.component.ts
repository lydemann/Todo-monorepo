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
	public firstFormGroup: FormGroup;
	public secondFormGroup: FormGroup;
	public isEditable = true;

	constructor(private _formBuilder: FormBuilder, private router: Router) {}

	public ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required],
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required],
		});
	}

	public register() {
		this.isEditable = false;
	}

	public continue() {
		this.router.navigate(['/']);
	}
}
