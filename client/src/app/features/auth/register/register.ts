import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.passwordsMatch()) {
      console.log('Register data:', this.form.value);
      // TODO: Replace with AuthService register call
    } else {
      console.warn('Form invalid or passwords do not match.');
    }
  }

  passwordsMatch(): boolean {
    return this.form.get('password')?.value === this.form.get('confirmPassword')?.value;
  }
}