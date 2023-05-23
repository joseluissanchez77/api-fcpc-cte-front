import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/loginRequest.interface';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string = '';
  loginForm = this.fb.group({
    email: ["jose@gmail.com", [Validators.required, Validators.email]],
    password: ["",[Validators.required]]
  })
  constructor(private fb:FormBuilder,
     private route:Router,
     private loginService: LoginService,
     ) { }

  ngOnInit(): void {
    this.checkLocalStorageLogin();
  }

  checkLocalStorageLogin(){
    if(this.loginService.getTokenStorage()){
      this.route.navigate(["inicio"]);
    }
  }
  // https://www.youtube.com/watch?v=jkdLRbrJj9M
  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData)=>{
          console.log(userData);
        },
        error:(errorData)=>{
          console.log(errorData);
          this.loginError = errorData?.error?.detail;
        },
        complete:()=>{
          console.info("Login esta completo");
          this.route.navigateByUrl("inicio");
          this.loginForm.reset();
        }
      });
      
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }
}
