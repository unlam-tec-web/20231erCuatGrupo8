import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  // Registrar usuario
  signUp(user: UserRegisterDto): Observable<any> {
    return this.http.post(this.url + '/login', user);
  }
}

// TODO: extraer a types/interfaces/models etc
export interface UserRegisterDto {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  address: string;
}

