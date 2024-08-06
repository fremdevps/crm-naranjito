import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginParams } from 'src/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly userKey = 'token';
  private http = inject(HttpClient);
  constructor() { }
  /*
  * Login
  * @param data LoginParams
  * @returns Observable
  *
  */
  login(data: LoginParams) {
    return this.http.post(`${this.apiUrl}/auth/login`, data).pipe(
      //Set the token in the local storage
      tap((res: any) => {
        this.setUser(res.user);
      }),
      catchError((err) => {
        throw err;
      })

    );
  }


  private setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));

  }
  getUser(): Observable<any> {
    const user = localStorage.getItem(this.userKey);

    return of(user ? JSON.parse(user) : null);
  }


}
