import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  addedToCart!: boolean

  constructor(
    private productService: ProductoService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }

  getProduct(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productService.obtenerProducto(id)
    .subscribe(product => {
      this.product = product
      this.cartService.alreadyInCart(this.product)
      .subscribe(added => this.addedToCart = added);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
