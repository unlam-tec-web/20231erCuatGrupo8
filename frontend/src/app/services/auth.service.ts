import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

// TODO Para mock del backend. Simula petición exitosa .Cuando tengamos el backend reemplazar la url
const SIGNUP_URL = 'https://dummyjson.com/http/200';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // Registrar usuario
  signUp(user: UserRegisterDto): Observable<any> {
    return this.httpClient.post(SIGNUP_URL, user)
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

