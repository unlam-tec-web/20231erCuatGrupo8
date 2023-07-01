import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './views/cart/cart.component';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CarouselModule } from '@coreui/angular';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { ValidatemailComponent } from './views/validatemail/validatemail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    MenuComponent,
    CarouselComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailComponent,
    ValidatemailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    ModalModule,
    ButtonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
