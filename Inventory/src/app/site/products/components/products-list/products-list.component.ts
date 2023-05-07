import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { GetProductsResponse } from '../../models/responses/get-products-response';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/site/core/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList:GetProductsResponse[] = [];

  viewAll:boolean = false;

  constructor(private productService:ProductService,
              private toastr:ToastrService){

  }

  async ngOnInit(): Promise<void> {
    await this.LoadProducts();
  }


  async LoadProducts() : Promise<void>
  {
    try {
      var result = await firstValueFrom(this.productService.GetProducts());
      if(result && result.length > 0)
      {
        this.productList = result;
      }
    } catch (error) {
      
    }
    
  }

  toggle()
  {
    this.viewAll = !this.viewAll;
  }

}
