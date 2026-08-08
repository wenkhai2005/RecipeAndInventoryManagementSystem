import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class AddUser {
  user: User = new User();
  message = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  addUser() {
    if (
      !this.user.email ||
      !this.user.password ||
      !this.user.fullname ||
      !this.user.role ||
      !this.user.phone
    ) {
      this.error = 'All fields are required.';
      this.message = '';
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: (data: any) => {
        console.log('User registered successfully:', data);
        this.message = 'Registration successful!';
        this.error = '';

          this.router.navigate(['/login-34389792']);

      },
      error: (err) => {
        console.error('Registration error:', err);
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.message = '';
      },
    });
  }
}
