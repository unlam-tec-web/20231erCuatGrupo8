import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product;

  constructor(private cartService: CartService) {
  }

  addToCart(product: Product) {
    // TODO verificar que no haya sido agregado todavía

    this.cartService.addProduct(this.product);
  }

}
