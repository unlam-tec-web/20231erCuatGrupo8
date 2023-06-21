import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  inCart$: Observable<boolean> | undefined

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.inCart$ = this.cartService.alreadyInCart(this.product);
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }

}
