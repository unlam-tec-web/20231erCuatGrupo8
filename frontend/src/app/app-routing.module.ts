import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { CartComponent } from './views/cart/cart.component';
import { LoginComponent } from './views/login/login.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { ValidatemailComponent } from './views/validatemail/validatemail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: SignupComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'ingreso', component: LoginComponent },
  { path: 'validarmail', component: ValidatemailComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'listar-producto', component: ListarProductosComponent },
  { path: 'publicaciones', component: ProductListComponent },
  { path: 'publicacion/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // para ruteos incorrectos vaya al home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
