import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { firstValueFrom } from 'rxjs';
import { GetBrandsResponse } from '../../models/responses/get-brand-response';

@Component({
  selector: 'app-get-brands',
  templateUrl: './get-brands.component.html',
  styleUrls: ['./get-brands.component.scss']
})
export class GetBrandsComponent implements OnInit {
  brandsList : GetBrandsResponse[] = [];
  constructor(private brandService : BrandService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadBrands();
  }

  async LoadBrands() : Promise<boolean>
  {
    try 
    {
      const data = await firstValueFrom(this.brandService.GetBrands());
      if(data && data.length>0)
      {
        this.brandsList = data;
        console.log(this.brandsList);
        return true;
      }
    } 
    catch (error) {
      // manejar el error
    }
      return false;
  }

}

