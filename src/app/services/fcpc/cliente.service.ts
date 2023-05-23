import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseI } from 'src/app/model/cliente.interface';
import { UrlParameterStandardI } from 'src/app/model/generalParameter.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URL_API = environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  getCustomerPaginate(dataOption? :UrlParameterStandardI):Observable<CustomerResponseI>{

    let page = dataOption?.page;
    let size = dataOption?.size;
    let sort = dataOption?.sort;
    let type_sort = dataOption?.type_sort;

    let direcion =`${this.URL_API}customer?page=${page}&size=${size}&type_sort=${type_sort}&sort=${sort}`;

    return this.http.get<CustomerResponseI>(direcion);

  }
}
