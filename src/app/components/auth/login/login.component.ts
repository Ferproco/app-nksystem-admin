import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../model/Login.model';
import { Session } from '../../model/Session.model';
import { LoginService } from './LoginService.service';
import { StorageService } from './StorageService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formuser: FormGroup;
  LoginModel: Login;
  loading = false;
  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private loginService: LoginService,
              private storageService: StorageService,
              private toastr: ToastrService) {

    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.formuser = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern('^([^\\s]|\\s[^\\s])+$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]]

    });
  }

  login(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formuser.value;
    this.loginService.login(value.username, value.password)
    .subscribe(response => {  
      this.storageService.setCurrentSession(response as Session);    
      this.router.navigate(['main/dashboard']);
      this.loading = false;
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      if (error.status === 404) {

      }
      else {
        this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
          { enableHtml: true, closeButton: true });
      }
    }));
  
  }

  get username() {
    return this.formuser.get('username');
  }

}
