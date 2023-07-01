import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart } from '../models/cart';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // NOTA: El $ al final se usa por convención para Observables
  // https://angular.io/guide/rx-library#naming-conventions-for-observables
  private shoppingCart$: BehaviorSubject<ShoppingCart>;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    // BehaviorSubject es un tipo de Observable que permite acceder al valor por BehaviorSubject.value
    this.shoppingCart$ = new BehaviorSubject<ShoppingCart>({ email: localStorage.getItem("email"), products: [], subTotal: 0 });
    this.getShoppingCart();
  }
  public loggedIn: String = "";

  private getShoppingCart() {
    if(!this.authService.loggedIn()) {
      return
    }

    this.httpClient.get<ShoppingCart>(API_URLS.CART.VIEW + `?cart=${localStorage.getItem('email')}`)
      .subscribe(
        {
          next: (shoppingCart: ShoppingCart) => {
            this.setShoppingCart(shoppingCart)
          },
          error: (err: any) => console.error('Error: ', err)
        }
      );
  }

  private setShoppingCart(shoppingCart: ShoppingCart) {
    this.shoppingCart$.next(shoppingCart);
  }

  getProducts(): Observable<Product[]> {
    return this.shoppingCart$.pipe(
      map(shoppingCart => shoppingCart.products)
    );
  }

  addProduct(product: Product): void {
    if(!this.authService.loggedIn()) {
      this.toastr.error("Necesitás una cuenta para usar el carrito.");
      return
    }
    this.httpClient.post<Product>(API_URLS.CART.ADD_PRODUCT, { id: product._id, userId: localStorage.getItem('email')})
      .subscribe(
        {
          next: (product: Product) => {
            // Si se agregó exitosamente se agrega a la lista del carrito del front
            this.toastr.success(`${product.name} se agregó al carrito`);
            this.setShoppingCart(
              {
                products: [...this.shoppingCart$.value.products, product],
                subTotal: this.shoppingCart$.value
                  .products
                  .reduce((total, product) => total + product.price, 0)
              } as ShoppingCart
            );
          },
          error: (err: any) => {
            this.toastr.error(err.error.error);
          }
        }
      );
  }

  removeProduct(product: Product) {
    if(!this.authService.loggedIn()) {
      this.toastr.error("Necesitás una cuenta para usar el carrito.");
      return
    }
    this.httpClient.post<Product>(API_URLS.CART.REMOVE_PRODUCT, { id: product._id, userId: localStorage.getItem('email') })
      .subscribe(
        {
          next: (product: Product) => {
            this.toastr.warning(`${product.name} se eliminó del carrito`);
            this.setShoppingCart(
              {
                products: [...this.shoppingCart$.value.products.filter(prod => prod._id !== product._id)],
                subTotal: this.shoppingCart$.value
                  .products
                  .reduce((total, product) => total + product.price, 0)
              } as ShoppingCart
            );
          },
          error: (err: any) => {
            console.error('Error: ', err)
            this.toastr.error(`Error al eliminar del carrito`);
          }
        }
      );
  }

  clearCart() {
    if(!this.authService.loggedIn()) {
      this.toastr.error("Necesitás una cuenta para usar el carrito.");
      return
    }
    this.httpClient.post<ShoppingCart>(API_URLS.CART.CLEAR, { id: localStorage.getItem('email') })
      .subscribe(
        {
          next: (cart: ShoppingCart) => {
            this.setShoppingCart(cart);
            this.toastr.warning("Se eliminaron todos los productos del carrito");
          },
          error: (err: any) => console.error('Error: ', err)
        }
      );
  }

  getCount(): Observable<number> {
    return this.shoppingCart$.pipe(
      map(shoppingCart => shoppingCart?.products.length)
    );
  }

  getSubTotal(): Observable<number> {
    return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const subTotal = shoppingCart?.products
          .reduce((tot, prod) => tot + prod.price, 0);
        return subTotal;
      })
    );
  }

  alreadyInCart(product: Product): Observable<boolean> {
    return this.shoppingCart$.pipe(
      map(shoppingCart =>
          // false
        shoppingCart?.products.filter(p => p._id === product._id).length > 0
      )
    )
  }
}

const API_URLS = {
  CART: {
    VIEW: "http://localhost:3000/api/cart/view",
    ADD_PRODUCT: "http://localhost:3000/api/cart/add",
    REMOVE_PRODUCT: "http://localhost:3000/api/cart/remove",
    CLEAR: "http://localhost:3000/api/cart/clear"
  }
}
