import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, this.usernameOrEmailValidator]],
      password: ['', Validators.required],
    });
  }

  usernameOrEmailValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null; // Handled by Validators.required
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9._-]+$/; // Alphanumeric with dots, underscores, and hyphens

    if (emailRegex.test(value) || usernameRegex.test(value)) {
      return null; // Valid
    }
    return { usernameOrEmail: true }; // Invalid
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
        },
        error: (error) => {
          console.error('Registration error:', error);
        },
      });
    }
  }
}
