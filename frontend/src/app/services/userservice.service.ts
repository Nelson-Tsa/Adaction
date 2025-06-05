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
    return this.http.get<User>(`${environment.apiUrl}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
