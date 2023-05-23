import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Customer, CustomerResponseI } from 'src/app/model/cliente.interface';
import { UrlParameterStandardI } from 'src/app/model/generalParameter.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { ClienteService } from 'src/app/services/fcpc/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit,OnDestroy {

  userLoginOn: boolean = true;

  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  @Input() objGetCurtomer: Customer[] = [];



  constructor(
    private loginService: LoginService,
    private clienteService:ClienteService,
  ) { 
    this.cientes();
  }
  ngOnDestroy(): void {
    this.loginService.currentUserLogiOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLogiOn.subscribe({
      next: (dataUserLoginOn) => {
        console.log(1 + '' + dataUserLoginOn);
        this.userLoginOn = dataUserLoginOn;
      },
    });
  }

  cientes() {
    // this.loading = true;
    let parameterUrl: UrlParameterStandardI = {
      page: this.page,
      size: this.pageSize, // this.rows,
      sort: 'id',
      type_sort: 'desc',
    };

    this.clienteService.getCustomerPaginate(parameterUrl).subscribe({
      next: (rpt: CustomerResponseI) => {
        // console.log(rpt);
        this.objGetCurtomer = rpt.data;
        this.collectionSize = rpt.total;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  dataCustomerRow(data:Customer){

  }

  loadPage(page: number) {
    this.cientes();
  }


}
