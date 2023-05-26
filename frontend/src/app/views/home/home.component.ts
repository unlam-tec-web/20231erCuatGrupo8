import { Component } from '@angular/core';
import { Product } from '../cart/Product';
import { mockProducts } from '../cart/mockProducts';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[]

  constructor(
    private cartService: CartService,
  ) {
    this.products = mockProducts;
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

}
