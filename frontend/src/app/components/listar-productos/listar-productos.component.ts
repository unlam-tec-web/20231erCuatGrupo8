import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})

export class ListarProductosComponent implements OnInit {
  listaProductos: Product[] = [];

  constructor(private  _productoService: ProductoService, // inyecto el servicioProducto
              private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.obtenerProductos(); // cuando carga la pagina ya tengo los datos
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      //console.log("lo que aparece abajo es lo que me trae el _productoService") //muestro por consola
      //console.log(data); //muestro por consola
      this.listaProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(_id: string) {
    this._productoService.eliminarProducto(_id).subscribe(data => {
      this.toastr.warning('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }
}

