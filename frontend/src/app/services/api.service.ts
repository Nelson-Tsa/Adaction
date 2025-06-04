import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de base de votre API Spring Boot
  private baseUrl = 'http://localhost:8080'; // Port standard Spring Boot, à ajuster si nécessaire

  constructor(private http: HttpClient) { }

  // Association
  getAssociations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/associations/read`);
  }

  getAssociation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/associations/read/${id}`);
  }

  // City
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cities/read`);
  }

  getCity(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cities/read/${id}`);
  }

  // Collect
  getCollects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/collects/read`);
  }

  getCollect(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/collects/read/${id}`);
  }

  // Donation
  getDonnations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donnations/read`);
  }

  getDonnation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/donnations/read/${id}`);
  }

  // Volunteer
  getVolunteers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/volunteers/read`);
  }

  getVolunteer(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/volunteers/read/${id}`);
  }

  // WasteCollected
  getWasteCollecteds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/waste-collected/read`);
  }

  getWasteCollected(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/waste-collected/read/${id}`);
  }

  // WasteType
  getWasteTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/wasteTypes/read`);
  }

  getWasteType(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/wasteTypes/read/${id}`);
  }

  // Méthodes génériques
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}/create`, data);
  }

  put<T>(endpoint: string, id: number, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/update/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/delete/${id}`);
  }
}
