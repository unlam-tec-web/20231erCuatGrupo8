import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // NOTA: El $ al final se usa por convención para Observables
  // https://angular.io/guide/rx-library#naming-conventions-for-observables
  private shoppingCart$: BehaviorSubject<ShoppingCart>;

  constructor(
    private httpClient: HttpClient
  ) {
    // BehaviorSubject es un tipo de Observable que permite acceder al valor por BehaviorSubject.value
    this.shoppingCart$ = new BehaviorSubject<ShoppingCart>({ products: [], subTotal: 0 });
    this.getShoppingCart();
  }

  private getShoppingCart() {
    // FIX: pasar el user id....
    this.httpClient.get<ShoppingCart>(API_URLS.CART.VIEW + `/aaaa`)
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
    if (this.alreadyInCart(product)) {
      console.log("Ya tenés el producto agregado");
      return;
    }

    this.httpClient.post<Product>(API_URLS.CART.ADD_PRODUCT, { id: product._id })
      .subscribe(
        {
          next: (product: Product) => {
            // Si se agregó exitosamente se agrega a la lista del carrito del front
            this.setShoppingCart(
              {
                products: [...this.shoppingCart$.value.products, product],
                subTotal: this.shoppingCart$.value
                  .products
                  .reduce((total, product) => total + product.price, 0)
              } as ShoppingCart
            );
          },
          error: (err: any) => console.error('Error: ', err)
        }
      );
  }

  removeProduct(product: Product) {
    if (!this.alreadyInCart(product)) {
      return;
    }

    // TODO: debería ser también un POST al backend
    this.httpClient.post<Product>(API_URLS.CART.REMOVE_PRODUCT, { id: product._id })
      .subscribe(
        {
          next: (product: Product) => {
            this.setShoppingCart(
              {
                products: [...this.shoppingCart$.value.products.filter(prod => prod._id !== product._id)],
                subTotal: this.shoppingCart$.value
                  .products
                  .reduce((total, product) => total + product.price, 0)
              } as ShoppingCart
            );
          },
          error: (err: any) => console.error('Error: ', err)
        }
      );
  }

  clearCart() {
    // TODO: habría que obtener el id de usuario de la sessión/jwt, etc
    this.httpClient.post<ShoppingCart>(API_URLS.CART.CLEAR, { id: "HARCODEADO" })
      .subscribe(
        {
          next: (cart: ShoppingCart) => {
            this.setShoppingCart(cart);
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

  private alreadyInCart(product: Product): boolean {
    return this.shoppingCart$.value.products.filter(p => p._id == product._id).length > 0;
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
