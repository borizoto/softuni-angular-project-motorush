
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './login.html',
	styleUrl: './login.css'
})
export class Login {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			console.log('Login data:', this.form.value);
			// TODO: Replace with AuthService login call
		}
	}
}
