import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarComponent } from './Common/hogar/hogar.component';
import { LoginComponent } from './Common/login/login.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { TipoUsuarioComponent } from './Common/tipo-usuario/tipo-usuario.component';
import { DashboardPlanificadorComponent } from './planificador/dashboard-planificador/dashboard-planificador.component';
import { EventosformComponent } from './planificador/forms-planificador/eventosform/eventosform.component';

import { FavoritosComponent } from './planificador/favoritos/favoritos.component';
import { EventosComponent } from './planificador/eventos/eventos.component';
import { ServiciosComponent } from './planificador/servicios/servicios.component';
import { PlanesComponent } from './planificador/planes/planes.component';
import { PerfilComponent } from './planificador/perfil/perfil.component';
import { DashboardProvComponent } from './proveedor/dashboard-prov/dashboard-prov.component';
import { MembresiaProvComponent } from './proveedor/membresia-prov/membresia-prov.component';
import { PerfilProvComponent } from './proveedor/perfil-prov/perfil-prov.component';
import { ServiciosProvComponent } from './proveedor/servicios-prov/servicios-prov.component';
import { ServiciosformComponent } from './proveedor/forms-proveedor/serviciosform/serviciosform.component';
import { PlanPagoComponent } from './planificador/plan-pago/plan-pago.component'

// -- GUARDS
import { AuthGuard } from './guards/auth.guard';
import { AuthProvGuard } from './guards/auth-prov.guard'
import { CompraPlanComponent } from './Common/compra-plan/compra-plan.component';
import { CompraPlanEmpresarialComponent } from './Common/compra-plan-empresarial/compra-plan-empresarial.component';
import { ContactanosEmpresarialComponent } from './Common/contactanos-empresarial/contactanos-empresarial.component';
import { SeleccionEventosComponent } from './planificador/seleccion-eventos/seleccion-eventos.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'hogar', component:HogarComponent},
  {path: 'registrar', component:RegistroComponent},
  {path: 'tipo-usu', component:TipoUsuarioComponent},
  {path: 'compra-plan', component:CompraPlanComponent},
  {path: 'compra-plan-empresarial', component:CompraPlanEmpresarialComponent},
  {path: 'contactanos-empresarial', component:ContactanosEmpresarialComponent},

  {path: 'planificador/dashboard', component: DashboardPlanificadorComponent, canActivate: [AuthGuard] },
  {path: 'planificador/favoritos', component:FavoritosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/eventos', component:EventosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/formeventos', component:EventosformComponent, canActivate: [AuthGuard]},
  {path: 'planificador/servicios', component:ServiciosComponent, canActivate: [AuthGuard]},
  {path: 'planificador/planes', component: PlanPagoComponent /*PlanesComponent*/, canActivate: [AuthGuard]},
  {path: 'planificador/perfil', component:PerfilComponent, canActivate: [AuthGuard]},
  {path: 'planificador/seleccion-evento', component:SeleccionEventosComponent, canActivate: [AuthGuard]},

  {path: 'proveedor/dashboard', component: DashboardProvComponent, canActivate: [AuthProvGuard]},
  {path: 'proveedor/membresia', component: MembresiaProvComponent, canActivate: [AuthProvGuard]},
  {path: 'proveedor/perfil', component: PerfilProvComponent, canActivate: [AuthProvGuard]},
  {path: 'proveedor/servicios', component: ServiciosProvComponent, canActivate: [AuthProvGuard]},
  {path: 'proveedor/formservicios', component: ServiciosformComponent, canActivate: [AuthProvGuard]},
  
  {path:'**',redirectTo:'hogar',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
