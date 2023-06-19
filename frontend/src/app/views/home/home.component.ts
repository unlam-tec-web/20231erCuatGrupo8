import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts$: Observable<Product[]> | undefined | null;

  constructor(
    private productoService: ProductoService
  ) {
    // Trae todos, y los filtra acá. Habría que hacer directo un endpoint con los destacdos(?)...
    this.featuredProducts$ = this.productoService.getProductos()
      .pipe(map(
        products => products.sort((p1: Product, p2: Product) => p2.price - p1.price).slice(0,3)
      ))
  }

}
