import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { LoadLottieService } from './site/core/load-lottie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventario';
  options: AnimationOptions = {
    path: 'assets/animation/ready.json',
    autoplay: true,
    loop: true
  };

  public isLoading$ : any;

  constructor(private loadingService: LoadLottieService) {}
  
  ngOnInit(): void {
  }
}
