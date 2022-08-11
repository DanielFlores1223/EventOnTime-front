import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './Common/encabezado/encabezado.component';
import { HogarComponent } from './Common/hogar/hogar.component';
import { LoginComponent } from './Common/login/login.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { TipoUsuarioComponent } from './Common/tipo-usuario/tipo-usuario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AuthService } from './services/auth.service';
import { DashboardPlanificadorComponent } from './planificador/dashboard-planificador/dashboard-planificador.component';
import { SidebarPlanificadorComponent } from './planificador/sidebar-planificador/sidebar-planificador.component';
import { AuthGuard } from './guards/auth.guard';
import { FavoritosComponent } from './planificador/favoritos/favoritos.component';
import { EventosComponent } from './planificador/eventos/eventos.component';
import { ServiciosComponent } from './planificador/servicios/servicios.component';
import { PlanesComponent } from './planificador/planes/planes.component';
import { PerfilComponent } from './planificador/perfil/perfil.component';
import { MembresiaComponent } from './planificador/membresia/membresia.component';
import { DashboardProvComponent } from './proveedor/dashboard-prov/dashboard-prov.component';
import { ServiciosProvComponent } from './proveedor/servicios-prov/servicios-prov.component';
import { MembresiaProvComponent } from './proveedor/membresia-prov/membresia-prov.component';
import { PerfilProvComponent } from './proveedor/perfil-prov/perfil-prov.component';
import { SidebarProvComponent } from './proveedor/sidebar-prov/sidebar-prov.component';
import { ServiciosformComponent } from './proveedor/forms-proveedor/serviciosform/serviciosform.component';

import { EventosformComponent } from './planificador/forms-planificador/eventosform/eventosform.component';
import { BodyPlanComponent } from './planificador/body-plan/body-plan.component';
import { CompraPlanComponent } from './Common/compra-plan/compra-plan.component';
import { CompraPlanEmpresarialComponent } from './Common/compra-plan-empresarial/compra-plan-empresarial.component';
import { ContactanosEmpresarialComponent } from './Common/contactanos-empresarial/contactanos-empresarial.component';
import { SeleccionEventosComponent } from './planificador/seleccion-eventos/seleccion-eventos.component';
import { PlanPagoComponent } from './planificador/plan-pago/plan-pago.component';

//Libs
import { NgCreditCardModule } from 'angular-credit-card';
import { NgxSpinnerModule } from "ngx-spinner";
import { PlanesBuySelectorComponent } from './Common/compra-plan/tabs/planes-buy-selector/planes-buy-selector.component';
import { PagarCreditCardComponent } from './Common/compra-plan/tabs/pagar-credit-card/pagar-credit-card.component';
import { StarsGenerateComponent } from './Common/stars-generate/stars-generate.component';
import { NameTagComponent } from './Common/name-tag/name-tag.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    HogarComponent,
    LoginComponent,
    RegistroComponent,
    TipoUsuarioComponent,
    DashboardPlanificadorComponent,
    SidebarPlanificadorComponent,
    FavoritosComponent,
    EventosComponent,
    ServiciosComponent,
    PlanesComponent,
    PerfilComponent,
    MembresiaComponent,
    DashboardProvComponent,
    ServiciosProvComponent,
    MembresiaProvComponent,
    PerfilProvComponent,
    SidebarProvComponent,
    ServiciosformComponent,
    EventosformComponent,
  BodyPlanComponent,
  CompraPlanComponent,
  CompraPlanEmpresarialComponent,
  ContactanosEmpresarialComponent,
  SeleccionEventosComponent,
  PlanPagoComponent,
  PlanesBuySelectorComponent,
  PagarCreditCardComponent,
  StarsGenerateComponent,
  NameTagComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgCreditCardModule,
    NgxSpinnerModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
