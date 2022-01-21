import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SotoDeal\'s Wholesale Store';
  bootstrap: any;

  constructor(private loginService: LoginService) {}

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    return this.loginService.logout();
  }
}
