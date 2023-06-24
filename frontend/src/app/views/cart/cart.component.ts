import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts$: Observable<Product[]> | undefined;
  cartSubTotal$: Observable<number> | undefined;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.cartProducts$ = this.cartService.getProducts();
    this.cartSubTotal$ = this.cartService.getSubTotal();
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

}
