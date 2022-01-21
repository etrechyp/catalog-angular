import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './products.service';
import { Product } from '../../../models/product.model';
import { ProductList } from '../../../models/productlist.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {
  products : ProductList = {};
  currentPage: number = 1;
  totalPages: number = 0;

  productsOnCart:Product[] = [];

  constructor(private router: Router,
              private cartService: CartService,
              private productService: ProductService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (
      token != null &&
      token?.length == 172 &&
      token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    ) {
      this.productService.getProducts().subscribe((products: ProductList) => {
        this.products = products;
        this.totalPages = Math.ceil(products.TotalResults!.valueOf() / 50);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toNumber(value: any) {
    return Number(value);
  }

  onAddToCart(product: Product) {
    //TODO ojo con esto
   if(this.cartService.productsOnCart.includes(product)) {  //comprobacion si product.UPC ya esta en el carrito
      this.cartService.removeFromCart(product);
      this.cartService.addToCart(product);
      console.log(product.UPC);

    } else {
    this.cartService.addToCart(product);
    console.log(product.UPC);
    console.log(this.cartService.productsOnCart);
    }
  }


  onPageNext(pageNumber: number) {
    this.currentPage = pageNumber;
    this.productService.pageNumber = pageNumber;
    this.productService.getProducts().subscribe((products: ProductList) => {
      this.products = products;
      console.log(`Page ${this.currentPage}`);
    });
  }
    onPagePrev(pageNumber: number) {
      this.currentPage = pageNumber;
      this.productService.pageNumber = pageNumber;
      this.productService.getProducts().subscribe((products: ProductList) => {
        this.products = products;
        console.log(`Page ${this.currentPage}`);
      });
  }
}
