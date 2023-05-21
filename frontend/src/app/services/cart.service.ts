import { Injectable } from '@angular/core';
import { Product } from '../views/cart/Product';
import { BehaviorSubject, Observable, pluck } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    this.shoppingCart$ = new BehaviorSubject<ShoppingCart>({ products: [], subTotal: 0 });
    this.getShoppingCart();
  }

  private getShoppingCart() {
    // TODO, hay que pedirlo al backend
    this.httpClient.get<ShoppingCart>('./assets/cartData.json')
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
      pluck('products')
    );
  }

  addProduct(product: Product): void {
    console.log(product);
    // TODO debería ser un POST al backend
    this.setShoppingCart(
      {
        products: [...this.shoppingCart$.getValue().products, product],
        subTotal: this.shoppingCart$.getValue()
          .products
          .reduce((total, product) => total + product.price, 0)
      } as ShoppingCart
    );
  }

  removeProduct(product: Product) {
    const shoppingCart = { ...this.shoppingCart$.value };
    shoppingCart.products = shoppingCart.products.filter((prod) => prod.id !== product.id);
    this.setShoppingCart(shoppingCart);
  }
}


// Models
export interface ShoppingCart {
  products: Product[];
  subTotal: number;
}
