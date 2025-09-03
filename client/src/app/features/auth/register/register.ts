import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { passwordMismatch: true };
  // }

  onSubmit(): void {
    if (this.form.valid && this.passwordsMatch()) {
      const { email, password, username, phone } = this.form.value;

      this.authService.register(email, password, username, phone).subscribe({
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

  passwordsMatch(): boolean {
    return this.form.get('password')?.value === this.form.get('confirmPassword')?.value;
  }
}