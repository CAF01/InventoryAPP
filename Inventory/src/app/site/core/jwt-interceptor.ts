import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, finalize, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { LoadLottieService } from "./load-lottie-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private spinnerService : LoadLottieService,
                private router : Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      this.spinnerService.show();
        
    // Si la solicitud es un inicio de sesión, omite el token
    if (req.url.includes('login') || req.url.includes('access')) {
      return next.handle(req).pipe(finalize(() => {
        this.spinnerService.hide();
      }));
    }
    // Obtener el token del servicio AuthService
    const authToken = this.authService.getToken();
    // Clona la solicitud original y agrega el token en la cabecera Authorization
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // Devuelve la solicitud con la cabecera de autorización agregada
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hide();
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
          // Manejar error de autenticación
        } else if (error.status === 403) {
          this.spinnerService.hide();
          this.router.navigate(['errors/unauthorized']);
          // Manejar error de permisos
        } else {
          // Manejar otros errores
        }
        return throwError(() => new HttpErrorResponse({ error }));
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}