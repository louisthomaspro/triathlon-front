import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) {}

  public getSellerByUrl(sellerId: string) {
    return this.http.get<any>(`${environment.apiUrl}/sellers/${sellerId}`);
  }



  public getProducts(sellerId: string) {
    return this.http.get<any>(`${environment.apiUrl}/sellers/${sellerId}/products`);
  }

  public addProduct(product: any) {
    return this.http.post<any>(`${environment.apiUrl}/products`, product);
  }

  public deleteProduct(productId: string) {
    return this.http.delete<any>(`${environment.apiUrl}/products/${productId}`);
  }



  public getBaskets(sellerId: string) {
    return this.http.get<any>(`${environment.apiUrl}/sellers/${sellerId}/baskets`);
  }

  public addBasket(basket: any) {
    return this.http.post<any>(`${environment.apiUrl}/baskets`, basket);
  }

  public deleteBasket(basketId: string) {
    return this.http.delete<any>(`${environment.apiUrl}/baskets/${basketId}`);
  }



}
