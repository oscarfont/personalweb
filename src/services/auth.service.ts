import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = "http://localhost:3000/";
  isUserLoggedIn: boolean = false;

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    //console.log(userName);
    //console.log(password);
    /*this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => { 
          console.log("Is User Authentication is successful: " + val); 
      })
    );*/
    const data = {'email': userName, 'password': password};

    return this.http.post<any>(this.baseURL + 'user/login', data, {headers: this.httpHeader});
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn'); 
  }
}
