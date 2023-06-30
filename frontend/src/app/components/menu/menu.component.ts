import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  public loggedIn: String = "";
  constructor(private authService: AuthService) {
    this.authService.isLog.subscribe(
      {
        next: (estado) => {
          this.loggedIn = estado
        }
        ,
        error: () => {
          this.loggedIn = ""
        }
      }
    )
  }
  
  


  logout(): void {
    this.loggedIn = ""
  }
}
