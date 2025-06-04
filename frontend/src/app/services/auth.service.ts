

import { jwtDecode } from 'jwt-decode';
// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // login(authResponse: any) {
  //   localStorage.setItem('token', authResponse.token);
  //   localStorage.setItem('username', authResponse.username);
  //   localStorage.setItem('role', authResponse.role);
  // }
  
  isAssociation(): boolean {
    const token: any = localStorage.getItem('token');
    const decoded : any = jwtDecode(token);
    const role = decoded.role;
    return role === 'ASSOCIATION';
  }
  
  isVolunteer(): boolean {
    const token: any = localStorage.getItem('token');
    const decoded : any = jwtDecode(token);
    const role = decoded.role;
    return role === 'VOLONTAIRE';
  }
  
  isAdministrator(): boolean {
    const token: any = localStorage.getItem('token');
    const decoded : any = jwtDecode(token);
    const role = decoded.role;
    return role === 'ADMIN';
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