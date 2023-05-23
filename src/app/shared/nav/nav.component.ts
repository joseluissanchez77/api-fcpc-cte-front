import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  userLoginOn : boolean = false;
  constructor(private loginService:LoginService,
    private router:Router) 
  { }
  ngOnDestroy(): void {
    this.loginService.currentUserLogiOn.unsubscribe;
    
  }

  ngOnInit(): void {
    this.loginService.currentUserLogiOn.subscribe(
      {
        next : (dataUserLogin) => {
          if(this.loginService.getTokenStorage()){
            this.userLoginOn = true;
          }else{
            this.userLoginOn = dataUserLogin;
          }
        }
      }
    )
  }

  cerrarSession(){

    this.loginService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('Bearer');
        this.router.navigate([""]);
      },
      error: (e) => {
        console.log(e);
       
      }
      // complete: () => console.info('complete') 
    })
    
  }
}
