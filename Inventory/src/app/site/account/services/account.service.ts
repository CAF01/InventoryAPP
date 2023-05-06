import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserRequest } from '../models/requests/login-user-request';
import { LoginUserResponse } from '../models/responses/login-user-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  controller = 'Users';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}

  loginUser(request: LoginUserRequest): Observable<LoginUserResponse> {
    return this._http.post<LoginUserResponse>(
      `${environment.url_api}${this.controller}/login`,
      request
    );
  }

  handleError(error: any): Observable<never> {
    let errors: string[] = [];
  
    if (error.error.errors) {
      const validationErrors = error.error.errors;
      for (const propertyName in validationErrors) {
        if (validationErrors.hasOwnProperty(propertyName)) {
          for (const propertyError of validationErrors[propertyName]) {
            errors.push(`${propertyName}: ${propertyError}`);
          }
        }
      }
    }
  
    // Manejar el error aquí y retornar el arreglo de errores
    return throwError(()=>errors);
  }
}
