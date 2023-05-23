import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DasgboardComponent } from './pages/dasgboard/dasgboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ProductoComponent } from './fcpc/producto/producto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraComponent } from './fcpc/orden-compra/orden-compra.component';
import { ClienteComponent } from './fcpc/cliente/cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DasgboardComponent,
    LoginComponent,
    NavComponent,
    ProductoComponent,
    OrdenCompraComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // MatCardModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS , useClass : AuthInterceptor, multi :true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
