import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../products/products.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (
      token != null &&
      token?.length == 172 &&
      token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    ) {
      this.productService.getCfToken().subscribe((data) => {
        window.localStorage.setItem('cfToken', data.access_token);
        this.productService.cfToken = data.access_token;
      });

      setInterval(() => {
        this.loginService.logout();
      }, 1000 * 3600); // 1 hour
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
