import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router){

  }
  canActivate(): boolean {
    if(this._authService.loggedIn()){
      if(this._authService.getRole()=='Planificador'){
        return true;
      }else{
        this.router.navigate(['/proveedor/dashboard']);
        return false;
      }
    }else{
      this.router.navigate(['/hogar']);
      return false;
    }
  }
}