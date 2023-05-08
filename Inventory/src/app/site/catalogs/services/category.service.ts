import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/requests/add-category-request';
import { AddCategoryResponse } from '../models/responses/add-category-response';
import { UpdateCategoryRequest } from '../models/requests/update-category-request';
import { UpdateCategoryResponse } from '../models/responses/update-category-response';
import { GetCategoriesResponse } from '../models/responses/get-category-response';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  CategoriesController = 'Categories';
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private _http: HttpClient) {}
  AddCategory(request: AddCategoryRequest): Observable<AddCategoryResponse> {
    return this._http.post<AddCategoryResponse>(
      `${environment.url_api}${this.CategoriesController}/create-category`,
      request
    );
  }

  UpdateCategory(request: UpdateCategoryRequest): Observable<UpdateCategoryResponse> {
    return this._http.put<UpdateCategoryResponse>(
      `${environment.url_api}${this.CategoriesController}/update-category`,
      request
    ).pipe(takeUntil(this.destroy$));
  } 

  GetCategories(): Observable<GetCategoriesResponse[]> {
    return this._http.get<GetCategoriesResponse[]>(
      `${environment.url_api}${this.CategoriesController}/category-list`
    ).pipe(takeUntil(this.destroy$));
  }  
}
