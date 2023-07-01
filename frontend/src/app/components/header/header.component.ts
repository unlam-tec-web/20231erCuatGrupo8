import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartCount$: Observable<number> | undefined

  constructor(
    private cartService: CartService
  ) { }

  public loggedIn = localStorage.getItem('usuarme') ? true : false
  
  ngOnInit() {
    this.cartCount$ = this.cartService.getCount();
  }

}
