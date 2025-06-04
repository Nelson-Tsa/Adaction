// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  login(authResponse: any) {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('username', authResponse.username);
    localStorage.setItem('role', authResponse.role);
  }
  
  isAssociation(): boolean {
    return localStorage.getItem('role') === 'ASSOCIATION';
  }
  
  isVolunteer(): boolean {
    return localStorage.getItem('role') === 'VOLONTAIRE';
  }
  
  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
}