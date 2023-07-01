import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent {
  constructor(private authService: AuthService) {

  }
  public loggedIn = localStorage.getItem('usuarme')? true: false


  logout(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('usuarme')
    location.reload()
  }
}
