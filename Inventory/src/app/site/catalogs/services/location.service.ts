import { Injectable } from '@angular/core';
import { GetLocationResponse } from '../models/responses/get-location-response';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateLocationRequest } from '../models/requests/update-location-request';
import { UpdateLocationResponse } from '../models/responses/update-location-response';
import { AddLocationResponse } from '../models/responses/add-location-response';
import { AddLocationRequest } from '../models/requests/add-location-request';
import { UpdateStatusLocationRequest } from '../models/requests/update-status-location-request';
import { UpdateStatusLocationResponse } from '../models/responses/update-status-location-response';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  controller = 'Catalogs';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}
  AddLocation(request: AddLocationRequest): Observable<AddLocationResponse> {
    return this._http.post<AddLocationResponse>(
      `${environment.url_api}${this.controller}/create-location`,
      request
    );
  }

  UpdateLocation(request: UpdateLocationRequest): Observable<UpdateLocationResponse> {
    return this._http.put<UpdateLocationResponse>(
      `${environment.url_api}${this.controller}/update-location`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  UpdateStatusLocation(request: UpdateStatusLocationRequest): Observable<UpdateStatusLocationResponse> {
    return this._http.put<UpdateStatusLocationResponse>(
      `${environment.url_api}${this.controller}/set-location-status`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  GetLocations(): Observable<GetLocationResponse[]> {
    return this._http.get<GetLocationResponse[]>(
      `${environment.url_api}${this.controller}/location-list`
    ).pipe(takeUntil(this.destroy$));
  }  
}
