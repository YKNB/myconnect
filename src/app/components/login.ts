import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  email = '';
  password = '';

  loginWithEmail() {
    if (this.validateEmail(this.email)) {
      this.authService.loginWithEmail(this.email, this.password).subscribe();
    } else {
      console.error('Invalid email format');
      alert('Invalid email format');
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe();
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
}
