import { Component, OnInit } from '@angular/core';
import { GetLocationResponse } from '../../models/responses/get-location-response';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateLocationRequest } from '../../models/requests/update-location-request';
import { UpdateLocationResponse } from '../../models/responses/update-location-response';

@Component({
  selector: 'app-get-locations',
  templateUrl: './get-locations.component.html',
  styleUrls: ['./get-locations.component.scss']
})
export class GetLocationsComponent implements OnInit {
  locationsList : GetLocationResponse[] = [];
  form:FormGroup = {} as FormGroup;
  constructor(private locationService : LocationService,
              private fb: FormBuilder,
              private toast:ToastrService) {
    this.form = this.fb.group({
      Description: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(45)]],
      LocationID: ['', [Validators.required]],
      LineAddress: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
      City: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      Country: ['México', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      State: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      ZipCode: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(5)]],
    });
   }

  async ngOnInit(): Promise<void> {
    await this.LoadLocations();
  }

  async LoadLocations() : Promise<boolean>
  {
    try 
    {
      const data = await firstValueFrom(this.locationService.GetLocations());
      if(data && data.length>0)
      {
        this.locationsList = data;
        return true;
      }
    } 
    catch (error) {
      // manejar el error
    }
      return false;
  }

  viewDetails(item: GetLocationResponse)
  {
    if(item.locationID<=0)
    {
      return;
    }
    this.f.LocationID.setValue(item.locationID);
    this.f.Description.setValue(item.description);
    this.f.LineAddress.setValue(item.addressLine);
    this.f.Country.setValue(item.country);
    this.f.State.setValue(item.state);
    this.f.City.setValue(item.city);
    this.f.ZipCode.setValue(item.zipCode);
  }

  get f()
  {
    return this.form.controls;
  }

  UpdateLocation(){
    if(this.form.invalid)
    {
      this.toast.error('Ingrese todos los campos');
      return;
    }
    let request :UpdateLocationRequest = {} as UpdateLocationRequest;
    request.locationID = this.f.LocationID.value;
    request.description = this.f.Description.value;
    request.addressLine = this.f.LineAddress.value;
    request.city = this.f.City.value;
    request.country = this.f.Country.value;
    request.zipCode = this.f.ZipCode.value;
    request.state = this.f.State.value;

    this.locationService.UpdateLocation(request).subscribe({
      next: (response: UpdateLocationResponse) => {
        if(response != null && response.success)
        {
          
          let findItemIndex = this.locationsList.findIndex(x=>x.locationID == request.locationID);
          if (findItemIndex !== -1) { // Si se encontró el elemento
            let updatedLocationObject = this.locationsList[findItemIndex]; // Obtiene el objeto
            updatedLocationObject.addressLine=request.addressLine;
            updatedLocationObject.city=request.city;
            updatedLocationObject.country=request.country;
            updatedLocationObject.description=request.description;
            updatedLocationObject.state=request.state;
            updatedLocationObject.zipCode=request.zipCode;
            this.locationsList[findItemIndex] = updatedLocationObject; // Actualiza el objeto
          }
          this.toast.success('Dirección modificada correctamente');
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

