import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../model/user.model';

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080';

  user = signal<User | null | undefined>(undefined);

  constructor() {}

  register(user: Partial<User>): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + '/api/register', user).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        const newUser = Object.assign(new User(), {
          username: result['username'],
          email: user.email,
          role: 'ASSOCIATION',
        });
        this.user.set(newUser);
      }),
      map(() => {
        return this.user();
      })
    );
  }

  login(credentials: Credentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + '/api/login', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        const user = Object.assign(new User(), result['user']);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    );
  }

  getUser(): Observable<User | null | undefined> {
    return this.http.get(this.BASE_URL + '/api/me').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    );
  }
}
