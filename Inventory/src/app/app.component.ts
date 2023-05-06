import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { LoadLottieService } from './site/core/load-lottie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Inventario';
  loading: boolean = false;
  options: AnimationOptions = {
    path: 'assets/animation/ready.json',
    autoplay: true,
    loop: true
  };

  public isLoading$ = this.loadingService.spinnerVisible$;

  constructor(private loadingService: LoadLottieService) {}
  
}