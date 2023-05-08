import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/core/auth.service';
import { LoginUserResponse } from '../../models/responses/login-user-response';
import { LoginUserRequest } from '../../models/requests/login-user-request';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  isPageLoaded = false;
  isProcessing = false;

  loginForm : FormGroup = {} as FormGroup;
  constructor(private fb: FormBuilder,
              private accountService : AccountService,
              private router: Router,
              private toast : ToastrService,
              public authService : AuthService,
    ){}

  ngOnInit() {
    const token = this.authService.getToken();
    if(token && token.length>0)
    {
      this.router.navigate(['/home']);
    }
    this.initLoginForm();
    this.isPageLoaded=true;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['eduardo.sarabia@grupologa.com', Validators.required],
      password: ['hire_me_please', Validators.required],
    });
  }

  async tryLogin()
  {
    this.submitted = true;
    if (this.loginForm.invalid)
    {
      this.toast.warning('Verifica los datos.', '', {
        tapToDismiss: false
      });
      return;
    }
    this.isProcessing=true;

    let data :LoginUserRequest = {} as LoginUserRequest;
    data.email='eduardo.sarabia@grupologa.com';
    data.password='Abcd1234';
    this.accountService.loginUser(data).subscribe(async (response: LoginUserResponse)=>
      {
        if(response.userID===0)
        {
          this.toast.error('No se encontró un usuario con esas credenciales', '', {
          });
          this.isProcessing=false;
          return;
        }
        this.saveUserStorage(response);
        this.isProcessing=false;
        this.router.navigate(['/home']);
      }),
      (error: any) => {
        this.toast.error('Ocurrió un error al iniciar sesión', '', {
        });
        this.isProcessing=false;
        this.submitted = false;
        return;
      }
  }

  oops() {
    this.toast.warning('En Mantenimiento...', '');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  saveUserStorage(res: LoginUserResponse) {
    if (res) {
      this.authService.saveToken(this.f.email.value, res.token);
      this.authService.saveUserID(res.userID.toString());
    } 
  }

}
