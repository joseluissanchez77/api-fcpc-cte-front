import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError,catchError, BehaviorSubject, tap} from 'rxjs';
import { DataUser, GeneralResponseI } from 'src/app/model/generalResponse.interface';
import { LoginRequest } from 'src/app/model/loginRequest.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogiOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<DataUser> = new BehaviorSubject<DataUser>({
    id:                0,
    name:              '',
    email:             '',
    email_verified_at: null
  });

  URL_API = environment.apiUrl;
  constructor( private http:HttpClient) { }

  // lef headers = new HttpHeaders({ "Content-Type": "application/json" });
  // `${this.URL_API}${endpoint}`

  login( credential : LoginRequest):Observable<GeneralResponseI>{
    return this.http.post<GeneralResponseI>(`${this.URL_API}login`, credential/* , { headers: headers } */).pipe(
      tap((userData:GeneralResponseI) =>{

        let data = userData.detail.dataUser;
        let bearer = userData.detail.Bearer;
        localStorage.setItem('Bearer',bearer );
        this.currentUserData.next(data);

        if(this.getTokenStorage()){
          this.currentUserLogiOn.next(true);
        }else{
          this.currentUserLogiOn.next(false);
        }

        // this.currentUserLogiOn.next(true);
      })/* ,
      catchError(this.handleError) */
    );
    // return this.http.get('http://api-fcpc-cte.test/api/login');
  }


  logout(){

    let direcion =`${this.URL_API}logout`;

    return this.http.post<GeneralResponseI>(direcion,null);

  }
    
  

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error("Se ha producido un error", error.error);
    }else{
      console.error('Backend retorno ell codigo de estado', error.status, error.error);
    }
    return throwError(()=> new Error('Algo fallo. Por favor intente nuevamente'));
  }

  get userData():Observable<DataUser>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLogiOn.asObservable();
  }

  getTokenStorage(){
    return localStorage.getItem('Bearer');
  }
}
