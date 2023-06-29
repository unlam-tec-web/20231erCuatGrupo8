import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private authService: AuthService) {
    this.authService.isLog.subscribe(
      {
        next: (estado) => {
          this.loggedIn = estado
        }
        ,
        error: () => {
          this.loggedIn = false
        }
      }
    )
  }
  public loggedIn: Boolean = false;


  logout(): void {
    this.authService.isLog = of(false)
  }
}
