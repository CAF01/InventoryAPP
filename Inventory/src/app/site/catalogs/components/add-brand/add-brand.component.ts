import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/site/core/auth.service';
import { BrandService } from '../../services/brand.service';
import { UploadImageRequest } from '../../models/requests/add-image-brand-request';
import { UploadImageResponse } from '../../models/responses/add-image-brand-response';
import { Toast, ToastrService } from 'ngx-toastr';
import { AddBrandRequest } from '../../models/requests/add-brand-request';
import { AddBrandResponse } from '../../models/responses/add-brand-response';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  validImage=false;
  imageUplaoded: boolean = false;
  imageFile: File= {} as File;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private brandService: BrandService,
    private toast : ToastrService) { 
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(30)]],
      image: [null, [Validators.required]]
    });
  }

  
  ngOnInit(): void {

  }

  loadImage(file: any): void {
    const selectedFile = file.currentTarget.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 1024 * 1024; // 1 MB
    this.validImage = false;
    // Validar que el archivo seleccionado sea una imagen
    if (!allowedTypes.includes(selectedFile.type)) {
      this.toast.error('Seleccione un archivo de imagen válido');
      return;
    }
  
    // Validar que el archivo no exceda el tamaño máximo permitido
    if (selectedFile.size > maxFileSize) {
      this.toast.error('El tamaño del archivo no debe exceder 1 MB');
      return;
    }
  
    this.imageFile = selectedFile;
    this.validImage = true;
    this.form.patchValue({
      image: this.imageFile.name
    });
  }


  uploadImage(): void {
    this.brandService.uploadFile(this.imageFile).subscribe({
      next: (response: UploadImageResponse) => {
        if(response.result != null && response.result.includes("http"))
        {
          this.f.image.setValue(response.result);
          this.imageUplaoded = true;
          this.toast.success('Imagen cargada correctamente');
        }
       },
      error: (err) => {
        if (err && err.status === 200) {
          let url_image = JSON.stringify(err.error.text);
        }
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  add(): void {
    this.uploadImage();
  }

  addBrand(): void {
    if(this.form.invalid)
    {
      this.toast.error('Ingrese todos los campos');
      return;
    }
    let request :AddBrandRequest = {} as AddBrandRequest;
    request.description = this.f.descripcion.value;
    request.imageUrl = this.f.image.value;

    this.brandService.AddBrand(request).subscribe({
      next: (response: AddBrandResponse) => {
        if(response != null && response.brandID>0)
        {
          this.toast.success('Marca agregada correctamente');
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
