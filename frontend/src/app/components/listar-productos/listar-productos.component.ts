import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})

export class ListarProductosComponent implements OnInit {
  listaProductos: Product[] = [];

  constructor(private _productoService: ProductoService) { // inyecto el servicioProducto
  }

  ngOnInit(): void {
    this.obtenerProductos(); // cuando carga la pagina ya tengo los datos
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log("lo que aparece abajo es lo que me trae el _productoService") //muestro por consola
      console.log(data); //muestro por consola
      this.listaProductos = data;
    }, error => {
      console.log(error);
    })

  }
}

