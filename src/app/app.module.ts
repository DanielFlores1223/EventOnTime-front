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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
