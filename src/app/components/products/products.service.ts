import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../models/product.model';
import { ProductList } from '../../../models/productlist.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService {
  pageNumber:number = 1;
  pageSize:number = 50;

  cfToken = '';

  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getCfToken(): Observable<any> {
    return this.http.post(
      `${environment.CF_URL}token`,
      {
        Username: environment.CF_USER,
        Password: environment.CF_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getProducts(): Observable<ProductList> {
    const cf = window.localStorage.getItem('cfToken');
    return this.http.get<ProductList>(
      `${environment.CF_URL}Catalog/GetAllByView?viewID=32&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${cf}`,
        },
      }
    );
  }
}
