import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {}

  public getStore(storeId: string) {
    return this.http.get<any>(`${environment.apiUrl}/stores/${storeId}`);
  }

  public getUsers(storeId: string) {
    return this.http.get<any>(`${environment.apiUrl}/stores/${storeId}/users`);
  }

  public addUser(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/register`, user);
  }

  public deleteUser(userId: string) {
    return this.http.delete<any>(`${environment.apiUrl}/users/${userId}`);
  }

  public getProducts(storeId: string) {
    return this.http.get<any>(`${environment.apiUrl}/stores/${storeId}/products`);
  }

  public addProduct(product: any) {
    return this.http.post<any>(`${environment.apiUrl}/products`, product);
  }

  public deleteProduct(productId: string) {
    return this.http.delete<any>(`${environment.apiUrl}/products/${productId}`);
  }

  public editProduct(product: any) {
    return this.http.put<any>(`${environment.apiUrl}/products/${product.id}`, product);
  }
  



}
