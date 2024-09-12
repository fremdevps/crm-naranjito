import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
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
  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  constructor() {
    this.loadUser();
  }
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
  private loadUser() {
    from(Preferences.get({ key: this.userKey })).pipe(
      map((res) => JSON.parse(res.value || '') as LoginResponse),
      catchError((err) => {
        console.error('Failed to load user', err);
        return [];
      })
    ).subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  setUser(user: LoginResponse) {
    Preferences.set({ key: this.userKey, value: JSON.stringify(user) }).then(() => {
      this.userSubject.next(user);
    });
  }
  getUser(): Observable<LoginResponse | null> {
    return this.userSubject.asObservable();
  }



  getToken(): Observable<string | undefined> {
    return this.getUser().pipe(
      map((res) => res?.items[0].cpassusuar)
    );
  }

}
