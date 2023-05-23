import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasgboardComponent } from './pages/dasgboard/dasgboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProductoComponent } from './fcpc/producto/producto.component';
import { OrdenCompraComponent } from './fcpc/orden-compra/orden-compra.component';
import { ClienteComponent } from './fcpc/cliente/cliente.component';

const routes: Routes = [
  // {path:'', redirectTo:'/inicio', pathMatch: 'full'},
  {path:'', redirectTo:'/iniciar-sesion', pathMatch: 'full'},
  {path:'inicio', component:DasgboardComponent, canActivate:[AuthGuard]},
  {path:'productos', component:ProductoComponent, canActivate:[AuthGuard]},
  {path:'clientes', component:ClienteComponent, canActivate:[AuthGuard]},
  {path:'orden-compra', component:OrdenCompraComponent, canActivate:[AuthGuard]},
  {path:'iniciar-sesion', component:LoginComponent/* , canActivate:[AuthGuard] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
