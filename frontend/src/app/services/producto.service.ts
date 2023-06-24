import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarProducto(product: Product): Observable<any> {
    return this.http.post(this.url + '/crear', product);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + '/eliminar/' + id);
  }

  obtenerProducto(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/producto/${id}`);
  }
}
