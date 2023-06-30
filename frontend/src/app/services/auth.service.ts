import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'http://localhost:3000/api/user';
  public isLog: Observable<String> = of("a");

  constructor(
    private http: HttpClient
  ) { }

  signUp(user: UserRegisterDto): Observable<any> {
    return this.http.post(this.url + '/login', user);
  }
}

export interface UserRegisterDto {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  address: string;
}
