import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products$: Observable<Product[]> | null;

  constructor(
    private productoService: ProductoService
  ) {
    // Así trae directamente todos. Podría hacerse un paginador/filtar por categorías, etc...
    this.products$ = this.productoService.getProductos()
  }
}
