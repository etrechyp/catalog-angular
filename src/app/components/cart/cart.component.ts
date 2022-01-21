import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  subTotalPrice: number = 0;
  shippingPrice: number = 0;
  taxPrice: number = 0;
  totalPrice: number = 0;

  constructor(private router: Router,
              public cartService: CartService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (
      token != null &&
      token?.length == 172 &&
      token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    ) {
      this.router.navigateByUrl('/cart');
      setInterval(() => {
        this.onGetPrices();
      });
    }
  }

  toNumber(value: any) {
    return Number(value);
  }

  onDelete(product: Product) {
    this.cartService.removeFromCart(product);
  }

  onDeleteAll() {
    this.cartService.removeAllFromCart();
  }

  onGetPrices() {
    this.subTotalPrice = this.cartService.getSubTotalPrice();
    this.shippingPrice = this.cartService.getShippingPrice();
    this.taxPrice = this.cartService.getTaxPrice();
    this.totalPrice = this.subTotalPrice + this.shippingPrice + this.taxPrice;
    }
}
