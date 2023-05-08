import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../services/location.service';
import { AddLocationRequest } from '../../models/requests/add-location-request';
import { AddLocationResponse } from '../../models/responses/add-location-response';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  form:FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder,
              private toast:ToastrService,
              private locationService:LocationService) { 
    this.form = this.fb.group({
      Description: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(45)]],
      LineAddress: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
      City: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      Country: ['México', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      State: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      ZipCode: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(5)]],
    });

  }

  ngOnInit(): void {
  }

  get f()
  {
    return this.form.controls;
  }

  addLocation(){
    if(this.form.invalid)
    {
      this.toast.error('Ingrese todos los campos');
      return;
    }
    let request :AddLocationRequest = {} as AddLocationRequest;
    request.description = this.f.Description.value;
    request.addressLine = this.f.LineAddress.value;
    request.city = this.f.City.value;
    request.country = this.f.Country.value;
    request.zipCode = this.f.ZipCode.value;
    request.state = this.f.State.value;

    this.locationService.AddLocation(request).subscribe({
      next: (response: AddLocationResponse) => {
        if(response != null && response.locationID>0)
        {
          this.toast.success('Dirección agregada correctamente');
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