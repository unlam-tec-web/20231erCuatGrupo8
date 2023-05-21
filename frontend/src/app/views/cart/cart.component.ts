import { Component } from '@angular/core';
import { Product } from './Product';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts$: Observable<Product[]> | undefined;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartProducts$ = this.cartService.getProducts();
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

}
