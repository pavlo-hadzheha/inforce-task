import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = { product: environment.API.PRODUCT };
  public onChange = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.product);
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.product}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.product}/${id}`);
  }

  create(product: IProductRequest): Observable<void> {
    return this.http.post<void>(this.api.product, product);
  }

  update(product: IProductResponse): Observable<void> {
      return this.http.patch<void>(`${this.api.product}/${product.id}`, product);
  }

}



