import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, takeUntil, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddBrandRequest } from '../models/requests/add-brand-request';
import { AddBrandResponse } from '../models/responses/add-brand-response';
import { UpdateBrandRequest } from '../models/requests/update-brand-request';
import { UpdateBrandResponse } from '../models/responses/update-brand-response';
import { UpdateStatusBrandRequest } from '../models/requests/update-status-brand-request';
import { UpdateStatusBrandResponse } from '../models/responses/update-status-brand-response';
import { GetBrandsResponse } from '../models/responses/get-brand-response';
import { UploadImageResponse } from '../models/responses/add-image-brand-response';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  Brandscontroller = 'Brands';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}

  AddBrand(request: AddBrandRequest): Observable<AddBrandResponse> {
    return this._http.post<AddBrandResponse>(
      `${environment.url_api}${this.Brandscontroller}/create-brand`,
      request
    );
  }

  UpdateBrand(request: UpdateBrandRequest): Observable<UpdateBrandResponse> {
    return this._http.put<UpdateBrandResponse>(
      `${environment.url_api}${this.Brandscontroller}/update-brand`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  UpdateStatusBrand(request: UpdateStatusBrandRequest): Observable<UpdateStatusBrandResponse> {
    return this._http.put<UpdateStatusBrandResponse>(
      `${environment.url_api}${this.Brandscontroller}/set-status-brand`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  GetBrands(): Observable<GetBrandsResponse[]> {
    return this._http.get<GetBrandsResponse[]>(
      `${environment.url_api}${this.Brandscontroller}/brand-list`
    ).pipe(takeUntil(this.destroy$));
  }  

  uploadFile(data: File): Observable<UploadImageResponse> {
    const header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    formData.append('formFile', data);
  
    return this._http.post<UploadImageResponse>(
      `${environment.url_api}${this.Brandscontroller}/upload-image`,
      formData,{headers: header}
    ).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('Error al cargar el archivo');
      })
    );
  }
}
