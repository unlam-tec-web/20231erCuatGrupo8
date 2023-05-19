import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Product[]

  constructor() {
    this.cartItems = mockProducts;
  }

}

// TODO: Más adelante traer del backend
const mockProducts: Product[] = [
  {id: '0', img: 'https://placehold.co/250x150', name: 'Ford focus', description: 'Todos los papeles al día', category: 'Auto', price: 10000000},
  {id: '1', img: 'https://placehold.co/250x150', name: 'Amarok', description: 'Todo terreno. En oferta!!!. Necesito la plata', category: 'Pickup', price: 40000000},
  {id: '2', img: 'https://placehold.co/250x150', name: 'Fiat Palio 1.4', description: 'Nuevo modelo. Muy pocos kms', category: 'Auto', price: 19000000},
]

interface Product {
  id: string,
  img: string,
  name: string,
  description: string,
  category: string, // Tipo auto, pickup, etc(lo pide en el tp)/clasificación
  price: number
}


