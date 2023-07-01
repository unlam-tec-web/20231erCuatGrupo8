import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'http://localhost:3000/api/user';

  constructor(
    private http: HttpClient
  ) { }

  signUp(user: UserRegisterDto): Observable<any> {
    return this.http.post(this.url + '/login', user);
  }

  validateEmail(userCode: UserCode) {
    return this.http.post(this.url + '/verify', userCode);
  }

  loggedIn(): boolean {
    return localStorage.getItem('email') ? true : false
  }

  getUser(): String | null {
    return localStorage.getItem('email');
  }
}

interface UserRegisterDto {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface UserCode {
  username: string;
  code: string;
}
