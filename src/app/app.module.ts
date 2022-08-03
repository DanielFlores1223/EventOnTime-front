import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
