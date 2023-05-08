import { Component, OnInit } from '@angular/core';
import { GetCategoriesResponse } from '../../models/responses/get-category-response';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../../models/requests/add-category-request';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryResponse } from '../../models/responses/add-category-response';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.scss']
})
export class GetCategoriesComponent implements OnInit {
  categoryList : GetCategoriesResponse[] = [];
  form:FormGroup = {} as FormGroup;

  constructor(private categoryService : CategoryService,
              private fb: FormBuilder,
              private toastr:ToastrService) { 
    this.form = this.fb.group({
      description: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]]
    });
  }
  
  ngOnInit() {
    this.LoadCategories();
  }

  LoadCategories()
  {
    this.categoryService.GetCategories().subscribe({
      next: (response: GetCategoriesResponse[]) => {
        this.categoryList = response;
        }
    });
  }

  addCategory(){
    if(this.form.invalid)
    {
      this.toastr.error('Ingrese todos los campos');
      return;
    }
    let request :AddCategoryRequest = {} as AddCategoryRequest;
    request.description = this.f.description.value;

    this.categoryService.AddCategory(request).subscribe({
      next: (response: AddCategoryResponse) => {
        if(response != null && response.categoryID>0)
        {
          this.toastr.success('Categoria agregada correctamente');
          let newCategory :GetCategoriesResponse = {} as GetCategoriesResponse;
          newCategory.description = request.description;
          newCategory.active=true;
          this.categoryList.push(newCategory);
          this.form.reset();
        }
        },
      error: (err) => {
        if (err && err.status === 200) {
          let url_image = JSON.stringify(err.error.text);
        }
      }
    });
  }

  get f()
  {
    return this.form.controls;
  }


}

