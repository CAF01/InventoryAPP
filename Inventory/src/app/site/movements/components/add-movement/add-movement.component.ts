import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetLocationResponse } from 'src/app/site/catalogs/models/responses/get-location-response';
import { LocationService } from 'src/app/site/catalogs/services/location.service';
import { AuthService } from 'src/app/site/core/auth.service';
import { GetProductsResponse } from 'src/app/site/products/models/responses/get-products-response';
import { ProductService } from 'src/app/site/products/services/product.service';
import { AddMovementRequest } from '../../models/requests/add-movement-request';
import { AddMovementDetailRequest } from '../../models/requests/add-movement-detail-request';
import { TypeOfMovement } from 'src/app/site/core/type-of-movement';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-add-movement',
  templateUrl: './add-movement.component.html',
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  locationList: GetLocationResponse[] = [];
  productList: GetProductsResponse[] = [];

  originalList: GetProductsResponse[] = [];

  filteredProducts: GetProductsResponse[] = [];

  selectedProducts: GetProductsResponse[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private locationService:LocationService,
    private productService:ProductService,
    private authService : AuthService,
    private movementService: MovementService
  ) { 
    this.form = this.fb.group({
      idLocacion: [0],
      search: [''],
      idLocacionDestino: [0],
      idUsuario: [0],
      idMovimiento: [0]
    });
  }

  reset()
  {
    var savedId=this.f.idMovimiento.value;
    if(this.f.idMovimiento.value>0)
    {
      this.form.reset();
      this.f.search.setValue('');
      this.f.idLocacion.setValue(0);
      this.f.idLocacionDestino.setValue(0);
      this.selectedProducts=[];
      this.productList=this.originalList;
      this.GetProducts();
      this.filteredProducts=[];
      this.f.idMovimiento.setValue(savedId);
    }
  }


  ngOnInit(): void {
    this.GetLocationList();
    this.GetProducts();
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe((res) => {
      this.productList = res;
    });
  }


  GetLocationList() {
    this.locationService.GetLocations().subscribe((res) => {
      this.locationList = res;
    });
  }

  get f () {
    return this.form.controls;
  }

  filterProductsByName() {
    // Convertimos el término de búsqueda a minúsculas para hacer la búsqueda case-insensitive
    const lowercaseSearchTerm = this.f.search.value.toLowerCase();
    if(!lowercaseSearchTerm || lowercaseSearchTerm.length < 1) {
      this.filteredProducts = [];
      return;
    }
    // Filtramos los productos por coincidencia de nombre y que estén activos
    const filtered = this.productList.filter(product => {
      return product.name.toLowerCase().includes(lowercaseSearchTerm) && product.active;
    });


    this.filteredProducts=filtered.slice(0, 2);
  
  }

  selectProduct(product: GetProductsResponse) {
    // Agregamos el producto a la lista de productos seleccionados

    //buscar que no exista el producto en los ya seleccionados
    const exist = this.selectedProducts.find(x => x.productID == product.productID);
    if(this.f.idMovimiento.value==2)
    {
      if(exist)
      {
        exist.stock -= 1;
        exist.quantity += 1;
      }
      else
      {
        product.stock -= 1;
        product.quantity = 1;
        this.selectedProducts.push(product);
      }
    }
    if(this.f.idMovimiento.value==1)
    {
      if(exist)
      {
        exist.stock += 1;
        exist.quantity += 1;
      }
      else
      {
        product.stock += 1;
        product.quantity = 1;
        this.selectedProducts.push(product);
      }
    }
  }

  removeProduct(product: GetProductsResponse) {
    // Reducimos la cantidad de producto -1 de la lista de productos seleccionados
    const exist = this.selectedProducts.find(x => x.productID == product.productID);
    if(this.f.idMovimiento.value==2)
    {
      if(exist && (exist.quantity-1==0))
      {
        this.selectedProducts.splice(this.selectedProducts.findIndex(x => x.productID == product.productID), 1);
        exist.stock += 1;
        return;
      }
      const originalProductOfList=this.productList.find(x => x.productID == product.productID);
      if(exist && originalProductOfList)
      {
        exist.stock += 1;
        exist.quantity -= 1;
      }
    }
    else
    {
      if(exist && (exist.quantity-1==0))
      {
        this.selectedProducts.splice(this.selectedProducts.findIndex(x => x.productID == product.productID), 1);
        exist.stock -= 1;
        return;
      }
      const originalProductOfList=this.productList.find(x => x.productID == product.productID);
      if(exist && originalProductOfList)
      {
        exist.stock -= 1;
        exist.quantity -= 1;
      }
    }
    
  }

  addProduct(product: GetProductsResponse) {
    // Aumentamos la cantidad de producto +1 de la lista de productos seleccionados
    const exist = this.selectedProducts.find(x => x.productID == product.productID);
    const originalProductOfList=this.productList.find(x => x.productID == product.productID);
    if(this.f.idMovimiento.value==2)
    {
      if(exist && originalProductOfList && exist.stock>0)
      {
        exist.stock -= 1;
        exist.quantity += 1;
      }
    }
    else
    {
      if(exist && originalProductOfList && exist.stock>0)
      {
        exist.stock += 1;
        exist.quantity += 1;
      }
    }
  }

  calculateAmount():number {
    // Calculamos el monto total de la compra con los productos seleccionados
    if(this.selectedProducts.length < 1)
      return 0;
    return this.selectedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }
    , 0);
  }

  addMovement(){
    if(this.form.invalid || this.selectedProducts.length < 1)
    {
      this.toastr.error('Faltan datos por completar');
      return;
    }
    let addMovementRequest: AddMovementRequest = {} as AddMovementRequest;
    let addMovementDetailRequest: AddMovementDetailRequest[] = [];
    addMovementRequest.typeOfMovement = this.f.idMovimiento.value==1?TypeOfMovement.ENTRADA:TypeOfMovement.SALIDA;

    addMovementRequest.createdAt = "2021-06-01T00:00:00";
    addMovementRequest.fromLocationID = this.f.idLocacion.value>0?this.f.idLocacion.value:null;
    addMovementRequest.toLocationID = this.f.idLocacionDestino.value>0?this.f.idLocacionDestino.value:null;
    this.f.idUsuario.setValue(Number(this.authService.getUserID()));
    addMovementRequest.userID = this.f.idUsuario.value;
    debugger;
    this.selectedProducts.forEach(product => {
      let detail: AddMovementDetailRequest = {} as AddMovementDetailRequest;
      detail.productID = product.productID;
      detail.quantity = product.quantity;
      detail.discount = 0;
      detail.unitPrice = product.price;
      detail.totalPrice = product.price * product.quantity;
      addMovementDetailRequest.push(detail);
    });
    addMovementRequest.movementProducts = addMovementDetailRequest;

    this.movementService.AddMovement(addMovementRequest).subscribe((res) => {
      if(res.movementID>0)
      {
        this.toastr.success('Movimiento agregado correctamente');
        this.router.navigate(['/home/movements']);
        this.reset();
      }
    });

  }


}
