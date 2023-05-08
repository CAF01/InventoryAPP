import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService:AuthService,
              private router: Router) { }
  showMenu = false;
  showNavMenu=false;
  isMobileMenuOpen = true;


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  openNavMenu() {
    this.showNavMenu = true;
  }
  closeNavMenu() {
    this.showNavMenu = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
