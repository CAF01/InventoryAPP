import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMovementsResponse } from '../models/responses/get-movements-response';
import { AddMovementResponse } from '../models/responses/add-movement-response';
import { AddMovementRequest } from '../models/requests/add-movement-request';
import { GetInversionResponse } from '../models/responses/get-inversion-response';
import { GetInAndOutsDayResponse } from '../models/responses/get-in-out-response';
import { GetMonthMovementsResponse } from '../models/responses/get-monthly-movements';
import { GetSalesByCategoryResponse } from '../models/responses/get-sales-by-category';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  controller = 'Movement';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}

  
  GetMovements(): Observable<GetMovementsResponse[]> {
    return this._http.get<GetMovementsResponse[]>(
      `${environment.url_api}${this.controller}`
    ).pipe(takeUntil(this.destroy$));
  }  

  GetInversion(): Observable<GetInversionResponse> {
    return this._http.get<GetInversionResponse>(
      `${environment.url_api}${this.controller}/inversion`
    ).pipe(takeUntil(this.destroy$));
  }  

  GetInOuts(): Observable<GetInAndOutsDayResponse> {
    return this._http.get<GetInAndOutsDayResponse>(
      `${environment.url_api}${this.controller}/in-outs`
    ).pipe(takeUntil(this.destroy$));
  }  

  GetMonthMovements(): Observable<GetMonthMovementsResponse[]> {
    return this._http.get<GetMonthMovementsResponse[]>(
      `${environment.url_api}${this.controller}/month-movement`
    ).pipe(takeUntil(this.destroy$));
  }  

  GetSalesByCategory(): Observable<GetSalesByCategoryResponse[]> {
    return this._http.get<GetSalesByCategoryResponse[]>(
      `${environment.url_api}${this.controller}/sales-category`
    ).pipe(takeUntil(this.destroy$));
  }  

  AddMovement(request: AddMovementRequest): Observable<AddMovementResponse> {
    return this._http.post<AddMovementResponse>(
      `${environment.url_api}${this.controller}`,
      request
    );
  }


  
}
