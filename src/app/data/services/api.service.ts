// from angular core
import { Injectable } from '@angular/core';
// angular common http
import {HttpClient} from "@angular/common/http";
// rxjs
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  //api url
  private readonly apiUrl:string = 'https://localhost:7122'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // for all get methods
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  // for all post methods
  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, data);
  }

  // for all put methods
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url}`, data);
  }

  // for all delete methods
  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${url}`);
  }

}
