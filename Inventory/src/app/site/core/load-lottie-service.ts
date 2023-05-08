import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LoadLottieService {
    private spinnerVisible = new BehaviorSubject<boolean>(false);
    spinnerVisible$ = this.spinnerVisible.asObservable();
    
    show() {
      this.spinnerVisible.next(true);
    }
  
    hide() {
      this.spinnerVisible.next(false);
    }
  }