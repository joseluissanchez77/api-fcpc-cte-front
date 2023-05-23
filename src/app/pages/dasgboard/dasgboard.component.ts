import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataUser } from 'src/app/model/generalResponse.interface';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dasgboard',
  templateUrl: './dasgboard.component.html',
  styleUrls: ['./dasgboard.component.css']
})
export class DasgboardComponent implements OnInit, OnDestroy {

  userLoginOn : boolean = false;
  userData? : DataUser;
  
  constructor(private loginService:LoginService) {
   }
  ngOnDestroy(): void {
    this.loginService.currentUserLogiOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }

  ngOnInit(): void {

    
    this.loginService.currentUserLogiOn.subscribe({
      next : (dataUserLoginOn) => {
        if(this.loginService.getTokenStorage()){
          this.userLoginOn = true;
        }else{
          this.userLoginOn = dataUserLoginOn;
        }
      }
    });

    this.loginService.currentUserData.subscribe({
      next : (dataUser)=>{
        this.userData = dataUser;

      }
    })
  }

}
