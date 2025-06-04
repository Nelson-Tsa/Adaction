import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http.get<User>('http://localhost:8080/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
