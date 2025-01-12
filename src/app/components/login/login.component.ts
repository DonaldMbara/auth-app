import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Response} from '../../models/responses.interface';

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
      userName: ['', [Validators.required, this.usernameOrEmailValidator]],
      passwordHash: ['', Validators.required],
    });
  }

  usernameOrEmailValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;

    if (emailRegex.test(value) || usernameRegex.test(value)) {
      return null;
    }
    return { userName: true };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value,'https://www.google.com/').subscribe({
        next: (response: Response) => {
            alert(`Login successful: ${response.message}`);
            console.log('Login successful:', response);
        },
        error: (error) => {
          if (error?.error?.message) {
            alert(`Login failed: ${error.error.message}`);
          } else {
            alert(`Something went wrong! Please try again`);
          }
          console.error('Login error:', error);
        },
      });
    }
  }
}
