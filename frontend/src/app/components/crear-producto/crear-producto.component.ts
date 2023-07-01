import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit {
  public productoForm: FormGroup; 

  constructor(private fb: FormBuilder, // FORMBUILDER https://angular.io/guide/reactive-forms --> Using the FormBuilder service to generate controls
              private router: Router,  // para navegar desde ts
              private toastr: ToastrService, // inyecto toastr que es para mostrar cartel de exito al crear
              private _productoService: ProductoService 
              )
  { 
    this.productoForm = this.fb.group({
      img: ['https://thumbs.dreamstime.com/z/coche-inc%C3%B3gnito-33985922.jpg'], //hardcodeo el valor de img
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    //console.log(this.productoForm);
    //console.log(this.productoForm.get('name')?.value);   //-----------> accedo al valor de la propiedad

    //Obtengo los datos del form
    const PRODUCT: Product = {
      img: this.productoForm.get('img')?.value, // esto esta demas pero dejarlo por si no se harcodea
      name: this.productoForm.get('name')?.value,
      description: this.productoForm.get('description')?.value,
      category: this.productoForm.get('category')?.value,
      price: this.productoForm.get('price')?.value,
    }
   
    //guardo el producto en la bd
    this._productoService.guardarProducto(PRODUCT).subscribe(data => {
      this.toastr.success('Felicitaciones!', 'Auto agregado correctamente'); //cartel exito
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    }); 
  }

}
