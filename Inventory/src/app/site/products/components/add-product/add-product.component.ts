import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetBrandsResponse } from 'src/app/site/catalogs/models/responses/get-brand-response';
import { GetCategoriesResponse } from 'src/app/site/catalogs/models/responses/get-category-response';
import { BrandService } from 'src/app/site/catalogs/services/brand.service';
import { CategoryService } from 'src/app/site/catalogs/services/category.service';
import { ProductService } from '../../services/product.service';
import { AddProductRequest } from '../../models/requests/add-product-request';
import { UploadImageResponse } from 'src/app/site/catalogs/models/responses/add-image-brand-response';
import { firstValueFrom } from 'rxjs';
import { AddProductResponse } from '../../models/responses/add-product-response';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categories: GetCategoriesResponse[] = [];
  brands: GetBrandsResponse[] = [];
  form:FormGroup = {} as FormGroup;
  validImage=false;
  imageFile: File= {} as File;

  constructor(private categoryService: CategoryService,
              private brandService : BrandService,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private productService:ProductService) { 
                this.form = this.fb.group({
                  ProductName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(75)]],
                  Description: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
                  Model: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(75)]],
                  Price: [0.00, [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/),Validators.min(0.01)]],
                  Category: [0, [Validators.required,Validators.min(1)]],
                  Brand: [0, [Validators.required,Validators.min(1)]],
                  Image: ['httpss', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
                });
              }

  ngOnInit() {
    this.LoadCategories();
    this.LoadBrands();
  }

  LoadCategories() {
    this.categoryService.GetCategories().subscribe((response: GetCategoriesResponse[]) => {
      this.categories = response;
    });
  }


  LoadBrands() {
    this.brandService.GetBrands().subscribe((response: GetBrandsResponse[]) => {
      this.brands = response;
    });
  }

  get f()
  {
    return this.form.controls;
  }

  async addProduct():Promise<void>{
    if(this.form.invalid)
    {
      this.toastr.error('Ingrese todos los campos','');
      return;
    }
    await this.uploadImageAndProduct();
  }

  loadImage(file: any): void {
    const selectedFile = file.currentTarget.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 1024 * 1024; // 1 MB
    this.validImage = false;
    // Validar que el archivo seleccionado sea una imagen
    if (!allowedTypes.includes(selectedFile.type)) {
      this.toastr.error('Seleccione un archivo de imagen válido');
      return;
    }
  
    // Validar que el archivo no exceda el tamaño máximo permitido
    if (selectedFile.size > maxFileSize) {
      this.toastr.error('El tamaño del archivo no debe exceder 1 MB');
      return;
    }
  
    this.imageFile = selectedFile;
    this.validImage = true;
  }

  async uploadImageAndProduct(): Promise<boolean> {
    this.productService.uploadFile(this.imageFile).subscribe({
      next: (response: UploadImageResponse) => {
        if(response.result != null && response.result.includes("http"))
        {
          this.f.Image.setValue(response.result);
          let request : AddProductRequest = {} as AddProductRequest;
          request.name = this.f.ProductName.value;
          request.description = this.f.Description.value;
          request.model = this.f.Model.value;
          request.price = this.f.Price.value;
          request.categoryID = this.f.Category.value;
          request.brandID = this.f.Brand.value;
          request.active = true;
          request.imageUrl = this.f.Image.value;
          this.productService.AddProduct(request).subscribe({
            next: (response: AddProductResponse) => {
              if(response != null && response.productID > 0)
              {
                this.toastr.success('Producto agregado correctamente','');
                this.form.reset();
                this.imageFile = {} as File;
                return true;
              }
              this.toastr.error('Error al cargar la imagen','');
              return false;
            }
          });
        }
        return false;
       },
      error: (err) => {
        if (err && err.status === 200) {
          let url_image = JSON.stringify(err.error.text);
        }
        return false;
      }

    });
    return false;
  }
}