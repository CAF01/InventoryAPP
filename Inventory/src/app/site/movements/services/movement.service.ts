import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMovementsResponse } from '../models/responses/get-movements-response';
import { AddMovementResponse } from '../models/responses/add-movement-response';
import { AddMovementRequest } from '../models/requests/add-movement-request';

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

  AddMovement(request: AddMovementRequest): Observable<AddMovementResponse> {
    return this._http.post<AddMovementResponse>(
      `${environment.url_api}${this.controller}`,
      request
    );
  }


  
}
