import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {RegisterResponse} from '../../models/responses.interface'

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(6)]],
      userName: [''], // Add userName here
    });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      // Set userName if not explicitly provided
      const email = this.signupForm.get('email')?.value;
      if (!this.signupForm.get('userName')?.value && email) {
        const userName = email.split('@')[0];
        this.signupForm.patchValue({ userName });
      }

      console.log('Payload Sent to Backend:', this.signupForm.value);

      // Send registration request
      this.authService.register(this.signupForm.value).subscribe({
        next: (response: RegisterResponse) => {
          console.log('Registration successful:', response);
          alert('Registration was successful');
        },
        error: (error) => {
          if (error?.error?.message) {
            console.error('Registration error:', error);
            alert(`Registration failed: ${error.error.message}`);
          } else {
            console.error('Unexpected registration error:', error);
            alert('Something went wrong! Please try again.');
          }
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
