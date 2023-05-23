import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlParameterStandardI } from 'src/app/model/generalParameter.interface';
import { Product, ProductResponseI } from 'src/app/model/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // auth_token = localStorage.getItem("Bearer");
  URL_API = environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  // http://api-fcpc-cte.test/api/product?page=1&size=5&type_sort=desc&search=&sort=id

  getProductPaginate(dataOption? :UrlParameterStandardI/* ,auth_token?:string */ ):Observable<ProductResponseI>{

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${auth_token}`
    //   })
    // };

    let page = dataOption?.page;
    let size = dataOption?.size;
    let sort = dataOption?.sort;
    let type_sort = dataOption?.type_sort;

    let direcion =`${this.URL_API}product?page=${page}&size=${size}&type_sort=${type_sort}&sort=${sort}`;

    return this.http.get<ProductResponseI>(direcion);

  }

  saveProducto( producct : Product){
    return this.http.post(`${this.URL_API}product`, producct);
  }

  deleteProducto( product : Product){
    return this.http.delete(`${this.URL_API}product/${product.id}`);
  }

  updateProducto( product : Product){
    return this.http.put(`${this.URL_API}product/${product.id}`, product);
  }

}
