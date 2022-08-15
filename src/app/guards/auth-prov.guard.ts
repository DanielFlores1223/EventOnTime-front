import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProvGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router){

  }
  canActivate(): boolean {
    if(this._authService.loggedIn()){
      if(this._authService.getRole()=='Proveedor'){
        return true;
      }else{
        this.router.navigate(['/planificador/dashboard']);
        return false;
      }
    }else{
      this.router.navigate(['/hogar']);
      return false;
    }
  }
}
