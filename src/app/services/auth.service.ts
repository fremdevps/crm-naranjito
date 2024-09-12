import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginParams, LoginResponse } from 'src/models/auth.model';
import { Preferences } from '@capacitor/preferences';
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
        this.setUser(res);
      }),
      catchError((err) => {
        throw err;
      })

    );
  }


  private async setUser(user: LoginResponse) {
    //use @capacitor/preferences to store the user token
    await Preferences.set({ key: this.userKey, value: JSON.stringify(user) });

  }
  getUser(): Observable<LoginResponse> {

    return from(Preferences.get({ key: this.userKey })).pipe(
      map((res) => JSON.parse(res.value || '') as LoginResponse),
      catchError((err) => {
        throw err;
      })
    );

  }


  getToken() {
    return this.getUser().pipe(
      map((res) => {
        return res.items[0].cpassusuar;
      })
    );
  }

}
