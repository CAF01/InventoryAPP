import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryRequest } from '../../models/requests/add-category-request';
import { CategoryService } from '../../services/category.service';
import { AddCategoryResponse } from '../../models/responses/add-category-response';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form:FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder,
              private toast:ToastrService,
              private categoryService:CategoryService) { 
    this.form = this.fb.group({
      description: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]]
    });

  }

  ngOnInit(): void {
  }

  get f()
  {
    return this.form.controls;
  }

  addCategory(){
    if(this.form.invalid)
    {
      this.toast.error('Ingrese todos los campos');
      return;
    }
    let request :AddCategoryRequest = {} as AddCategoryRequest;
    request.description = this.f.description.value;

    this.categoryService.AddCategory(request).subscribe({
      next: (response: AddCategoryResponse) => {
        if(response != null && response.categoryID>0)
        {
          this.toast.success('Categoria agregada correctamente');
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

}
