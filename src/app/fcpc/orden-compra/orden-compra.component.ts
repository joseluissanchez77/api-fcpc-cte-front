import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyResponseI, Compnay } from 'src/app/model/compania.interface';
import { EstablishmentlResponseI } from 'src/app/model/establecimiento.interface';
import { UrlParameterStandardI, establecientoParameterStandardI, ptEmsionParameterStandardI } from 'src/app/model/generalParameter.interface';
import { PoitnEmisionResponseI } from 'src/app/model/puntoEmision.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { OrdenCompraService } from 'src/app/services/fcpc/orden-compra.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit, OnDestroy {

  @Input() objGetCompany: Compnay[] = [];
  @Input() objGetEstablecimiento: EstablishmentlResponseI[]|any = [];
  @Input() objGetPuntoEmision: PoitnEmisionResponseI[]|any = [];
  userLoginOn: boolean = true;
  constructor(
    private loginService: LoginService,
    private ordenCompraService : OrdenCompraService,
  ) { 
    // this.companinaGet();
  }
  ngOnDestroy(): void {
    this.loginService.currentUserLogiOn.unsubscribe();
  }

  ngOnInit(): void {
    this.companinaGet();
    this.loginService.currentUserLogiOn.subscribe({
      next: (dataUserLoginOn) => {
        console.log(1 + '' + dataUserLoginOn);
        this.userLoginOn = dataUserLoginOn;
      },
    });
  }


  companinaGet(){
    let parameterUrl: UrlParameterStandardI = {
      page: 1,
      size:1000, 
      sort: 'id',
      type_sort: 'desc',
    };

    this.ordenCompraService.getCompañiaPaginate(parameterUrl).subscribe({
      next: (rpt: CompanyResponseI) => {
        console.log(rpt);
        this.objGetCompany = rpt.data;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  async getEstablecimiento($event:any){
    const companiaId = ($event.target.value).split(":")[1];
    this.getEstablecimientoByCompania(companiaId);
  }

  getEstablecimientoByCompania($company_id:number){
    let parameterUrl: establecientoParameterStandardI = {
      company_id:$company_id
    };

    this.ordenCompraService.getEstablecimiento(parameterUrl).subscribe({
      next: (rpt: EstablishmentlResponseI) => {
        this.objGetEstablecimiento = rpt;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }


  async getPuntoEmision($event:any){
    const establecimientoId = ($event.target.value).split(":")[1];
    this.getPuntoemisionByEstablecimiento(establecimientoId);
  }

  getPuntoemisionByEstablecimiento($establishment_id:number){
    let parameterUrl: ptEmsionParameterStandardI = {
      establishment_id:$establishment_id
    };

    this.ordenCompraService.getPuntoEmision(parameterUrl).subscribe({
      next: (rpt: PoitnEmisionResponseI) => {
        this.objGetPuntoEmision = rpt;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }


}
