import { Injectable } from '@angular/core';
import { Product } from '../../../models/product.model';


@Injectable()
export class CartService {

  productsOnCart: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.productsOnCart.push(product);
  }

  getProductsOnCart() {
    return this.productsOnCart;
  }

  removeFromCart(product: Product) {
    const index: number = this.productsOnCart.indexOf(product);
    if (index !== -1) {
      this.productsOnCart.splice(index, 1);
    }
  }

  removeAllFromCart() {
    this.productsOnCart = [];
  }

  getSubTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.productsOnCart.length; i++) {
      const price = parseFloat(this.productsOnCart[i].WholeSalePrice) * parseInt(this.productsOnCart[i].Qty);
      totalPrice += price;
    }
    return totalPrice;
  }

  getShippingPrice() {
    //TODO calculate shipping price
    return 0;
  }

  getTaxPrice() {
    //TODO calculate tax price
    return 0;
  }

}
