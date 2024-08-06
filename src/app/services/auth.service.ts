import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginParams } from 'src/models/auth.model';
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
        this.setUser(res.user);
      }),
      catchError((err) => {
        throw err;
      })

    );
  }


  private async setUser(user: any) {
    //use @capacitor/preferences to store the user token
    await Preferences.set({ key: this.userKey, value: JSON.stringify(user) });

  }
  getUser(): Observable<any> {

    return from(Preferences.get({ key: this.userKey })).pipe(
      map((res) => res.value),
      catchError((err) => {
        throw err;
      })
    );

  }


}
