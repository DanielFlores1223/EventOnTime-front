import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { Variant, showAlert } from '../../helpers/show-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user : User={
    email: "",
    password: ""
  };

  constructor(private _auth: AuthService, private router: Router, private activedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
  }

  login(){
    this.spinner.show();
    this._auth.loginUser(this.user)
      .subscribe(res =>{
        const data = res.result;
        console.log("saludos");
        console.log(data);
        localStorage.setItem("name",data.name);
        localStorage.setItem("role",data.role);
        localStorage.setItem("token",data.token);
        localStorage.setItem("account",data.account);
        localStorage.setItem("picture",data.picture?.url ?? '');
        //ALERTA DE CORRECTO
        //showAlert( res.msg , Variant.success );
      
        if(data.role=='Planificador'){
          this.router.navigate(['/planificador/dashboard']);
        }else if(data.role=='Proveedor'){
          this.router.navigate(['/proveedor/dashboard']);
        }else{
          
          this.router.navigate(['/hogar']);
        }
        this.spinner.hide();
        
      },err=>{
        //ALERTA DE ERROR
      showAlert( 'Información incorrecta', Variant.error );
        this.spinner.hide();
        console.log(err)
      })
  }
}
