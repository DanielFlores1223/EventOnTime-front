import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarComponent } from './Common/hogar/hogar.component';
import { LoginComponent } from './Common/login/login.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { TipoUsuarioComponent } from './Common/tipo-usuario/tipo-usuario.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'hogar', component:HogarComponent},
  {path: 'registrar', component:RegistroComponent},
  {path: 'tipo-usu', component:TipoUsuarioComponent},
  {path:'**',redirectTo:'hogar',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
