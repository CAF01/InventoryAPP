import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private isLoggedIn = false;
  
    constructor() { }
  
    saveToken(email: string, token: string) {
      const credentials = { email: email, token: token };
      localStorage.setItem('token',token); // Guarda el token en el almacenamiento local
      this.isLoggedIn = true;
      return true;
    }

    getToken(){
      return localStorage.getItem('token');
    }
  
    logout(): void {
      localStorage.removeItem('token'); // Elimina el token del almacenamiento local
      this.isLoggedIn = false;
    }
  
    isAuthenticated(): boolean {
      // Verifica si el token está presente y no ha expirado
      const token = localStorage.getItem('token');
      return !!token && !this.isTokenExpired(token);
    }
  
    private isTokenExpired(token: string): boolean {
      // TODO: Implementar lógica para verificar si el token ha expirado
      // Por ejemplo, puedes decodificar el token y comprobar la fecha de expiración
      return false;
    }
  }