
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './login.html',
	styleUrl: './login.css'
})
export class Login {
	form: FormGroup;

	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const { email, password } = this.form.value;

			this.authService.login(email, password).subscribe({
				next: (res) => {
					console.log('User registered:', res);
					this.router.navigate(['/home']);
				},
				error: (err) => {
					console.error('Registration failed:', err);
				}
			});
		} else {
			console.warn('Form invalid or passwords do not match.');
		}
	}
}