import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarComponent } from './Common/hogar/hogar.component';
import { LoginComponent } from './Common/login/login.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { TipoUsuarioComponent } from './Common/tipo-usuario/tipo-usuario.component';
import { DashboardPlanificadorComponent } from './planificador/dashboard-planificador/dashboard-planificador.component';
import { AuthGuard } from './guards/auth.guard';
import { FavoritosComponent } from './planificador/favoritos/favoritos.component';
import { EventosComponent } from './planificador/eventos/eventos.component';
import { ServiciosComponent } from './planificador/servicios/servicios.component';
import { PlanesComponent } from './planificador/planes/planes.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'hogar', component:HogarComponent},
  {path: 'registrar', component:RegistroComponent},
  {path: 'tipo-usu', component:TipoUsuarioComponent},
  {path: 'planificador/dashboard', component: DashboardPlanificadorComponent, canActivate: [AuthGuard] },
  {path: 'planificador/favoritos', component:FavoritosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/eventos', component:EventosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/servicios', component:ServiciosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/planes', component:PlanesComponent, canActivate: [AuthGuard]},
  {path:'**',redirectTo:'hogar',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
