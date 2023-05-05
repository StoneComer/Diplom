import { Component } from '@angular/core';
import { login } from '../interfaces';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  constructor(private auth: AuthService, private router: Router) {}

  password = '';
  login = '';
  user: login = {
    login: 'user',
    password: 'user1'
  }
  login_in() {
    if (this.login === this.user.login) {
      this.auth.role = 'user';
      this.router.navigate(['/profile']);
    }
  }
}
