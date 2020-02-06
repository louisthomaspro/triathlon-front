import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  public getStores() {
    return this.http.get<any>(`${environment.apiUrl}/stores`);
  }

  public getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  public getProducts() {
    return this.http.get<any>(`${environment.apiUrl}/products`);
  }

  public addStore(store: any) {
    return this.http.post<any>(`${environment.apiUrl}/stores`, store);
  }

  public deleteStore(storeId: string) {
    return this.http.delete<any>(`${environment.apiUrl}/stores/${storeId}`);
  }
  
}
