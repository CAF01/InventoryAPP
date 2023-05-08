import { Component, OnInit } from '@angular/core';
import { MovementService } from 'src/app/site/movements/services/movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  inOuts: any;
  inversion: any;
  monthMovements: any;
  categoryPopularity: any;

  constructor(private movementsService:MovementService)
  {

  }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.movementsService.GetInOuts().subscribe((data) => {
      this.inOuts = data;
    });
    this.movementsService.GetInversion().subscribe((data) => {
      this.inversion = data;
    });
    this.movementsService.GetMonthMovements().subscribe((data) => {
      this.monthMovements = data;
    });
    this.movementsService.GetSalesByCategory().subscribe((data) => {
      this.categoryPopularity = data;
    });
  }

}
