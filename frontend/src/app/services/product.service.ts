import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Product } from '../models/product';
import { ProductRequest } from '../models/productRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: ProductRequest): Observable<ProductRequest> {
    return this.http.post<ProductRequest>(`${API_CONFIG.baseUrl}/products`, product);
  }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.baseUrl}/products`).pipe(first());
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_CONFIG.baseUrl}/products/${id}`);
  }

  update(product: ProductRequest): Observable<ProductRequest> {
    return this.http.put<ProductRequest>(`${API_CONFIG.baseUrl}/products/${product.id}`, product);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${API_CONFIG.baseUrl}/products/${id}`);
  }

}
