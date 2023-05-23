import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyResponseI } from 'src/app/model/compania.interface';
import { EstablishmentlResponseI } from 'src/app/model/establecimiento.interface';
import { UrlParameterStandardI, establecientoParameterStandardI, ptEmsionParameterStandardI } from 'src/app/model/generalParameter.interface';
import { PoitnEmisionResponseI } from 'src/app/model/puntoEmision.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  URL_API = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  getCompañiaPaginate(dataOption? :UrlParameterStandardI):Observable<CompanyResponseI>{

    let page = dataOption?.page;
    let size = dataOption?.size;
    let sort = dataOption?.sort;
    let type_sort = dataOption?.type_sort;

    let direcion =`${this.URL_API}company?page=${page}&size=${size}&type_sort=${type_sort}&sort=${sort}`;

    return this.http.get<CompanyResponseI>(direcion);

  }
  getEstablecimiento(dataOption? :establecientoParameterStandardI):Observable<EstablishmentlResponseI>{

    let company_id = dataOption?.company_id;

    let direcion =`${this.URL_API}establishment-by-company?company_id=${company_id}`;

    return this.http.get<EstablishmentlResponseI>(direcion);

  }

  getPuntoEmision(dataOption? :ptEmsionParameterStandardI):Observable<PoitnEmisionResponseI>{

    let establishment_id = dataOption?.establishment_id;

    let direcion =`${this.URL_API}point_emission-by-establishment?establishment_id=${establishment_id}`;

    return this.http.get<PoitnEmisionResponseI>(direcion);

  }
}
