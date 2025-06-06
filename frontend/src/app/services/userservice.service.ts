import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const apiUrl = environment.apiUrl;
    return this.http.get<User>(`${apiUrl}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
