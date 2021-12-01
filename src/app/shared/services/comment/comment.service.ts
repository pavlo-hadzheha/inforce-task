import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICommentResponse, ICommentRequest, CommentUID } from '../../interfaces/comment.interface';
import { IProductResponse, ProductUID } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public api = { comment: environment.API.COMMENT };
  public onChange = new BehaviorSubject(true);

  constructor(
    private http: HttpClient
  ) { }

  create(comment: ICommentRequest): Observable<void> {
    return this.http.post<void>(this.api.comment, comment);
  }

  delete(id: CommentUID): Observable<void> {
    return this.http.delete<void>(`${this.api.comment}/${id}`);
  }

  get(productId: ProductUID): Observable<ICommentResponse[]> {
    return this.http.get<ICommentResponse[]>(`${this.api.comment}?productId=${productId}&_sort=date&_order=desc`);
  }

}
