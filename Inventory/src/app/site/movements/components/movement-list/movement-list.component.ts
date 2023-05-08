import { Component, OnInit } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { GetMovementsResponse } from '../../models/responses/get-movements-response';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/site/core/auth.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss']
})
export class MovementListComponent implements OnInit {

  movementList : GetMovementsResponse[] = [];
  actualMovement : GetMovementsResponse | null = null;
  isOnMovementPage=true;

  constructor(private movementService:MovementService,
              private toastr:ToastrService) { 
  }

  ngOnInit(): void {
    this.GetMovements();
  }

  ngonDestroy(): void {
    this.isOnMovementPage=false;
  }

  GetMovements(){
    this.movementService.GetMovements().subscribe((data)=>{
      if(data && data.length>0)
      {
        this.movementList=data;
      }
    });
  }

  calculateTotalPrice(request:GetMovementsResponse | null) : number
  {
    let total = 0;
    if(request?.movementDetails!=null)
    {
      request.movementDetails.forEach(element => {
        total+=element.totalPrice;
      });
    }
    return total;
  }

  OpenDetails(request:GetMovementsResponse | null)
  {
    if(request==null)
    {
      this.toastr.error("No se pudo obtener el detalle del movimiento");
      return;
    }
    this.actualMovement=request;
  }

  formatReadableDate(date: string | null | undefined): string {
    if(date==null)
     return "No programado";
    const dateObj = new Date(Date.parse(date));;
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

}
