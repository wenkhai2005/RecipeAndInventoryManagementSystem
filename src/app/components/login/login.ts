import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  returnUrl = '/dashboard-34389792';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard-34389792';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.errorMessage = '';

    this.userService.verifyUser({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res && res.fullname && res.role && res.email) {
            this.authService.loginAs(res.fullname, res.role, res.email, res.userId);
            this.router.navigate([this.returnUrl]);
          } else {
            this.errorMessage = 'Invalid response from server.';
          }
        },
        error: () => {
          this.errorMessage = 'Invalid email or password.';
        }
      });
  }
}
