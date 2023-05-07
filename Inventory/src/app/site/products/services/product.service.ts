import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, takeUntil, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProductRequest } from '../models/requests/add-product-request';
import { AddProductResponse } from '../models/responses/add-product-response';
import { UpdateProductRequest } from '../models/requests/update-product-request';
import { UpdateProductResponse } from '../models/responses/update-product-response';
import { GetProductsResponse } from '../models/responses/get-products-response';
import { UploadImageResponse } from '../../catalogs/models/responses/add-image-brand-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  controller = 'Products';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}

  AddProduct(request: AddProductRequest): Observable<AddProductResponse> {
    return this._http.post<AddProductResponse>(
      `${environment.url_api}${this.controller}/add-product`,
      request
    );
  }

  UpdateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse> {
    return this._http.put<UpdateProductResponse>(
      `${environment.url_api}${this.controller}/update-product`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  GetProducts(): Observable<GetProductsResponse[]> {
    return this._http.get<GetProductsResponse[]>(
      `${environment.url_api}${this.controller}/product-list`
    ).pipe(takeUntil(this.destroy$));
  }  

  uploadFile(data: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append('formFile', data);
  
    return this._http.post<UploadImageResponse>(
      `${environment.url_api}${this.controller}/upload-image`,
      formData
    ).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('Error al cargar el archivo');
      })
    );
  }
}
