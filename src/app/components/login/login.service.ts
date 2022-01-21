import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable()
export class LoginService {

  sessionUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    this.http.post(`${environment.API_URL}auth/login`, user).subscribe(
      (resp: any) => {
        this.sessionUser = resp.user;
        localStorage.setItem('user', JSON.stringify(this.sessionUser));
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/search']);
      },
      (err) => console.log(err)
    );
  }

  getIdToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token')?.length == 172 &&
      localStorage
        .getItem('token')
        ?.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    ) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
