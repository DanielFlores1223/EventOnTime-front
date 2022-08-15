import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NewUser } from 'src/app/models/newUser';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.scss']
})
export class TipoUsuarioComponent implements OnInit {

  newUser : NewUser={
    "name":"",
    "email":"",
    "password":"",
    "account":"Gratuito",
    "role":""
  };

  constructor(private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.newUser.name= localStorage.getItem('temp_name') || "";
    this.newUser.email= localStorage.getItem('temp_email') || "";
    this.newUser.password= localStorage.getItem('temp_password') || "";
  }

  registerUser(type:string){
    this.spinner.show();
    this.newUser.role = this.getType(type);
    this._auth.registerUser(this.newUser)
      .subscribe( res =>{
        const data = res.result;
        console.log(res);
        localStorage.removeItem('temp_name');
        localStorage.removeItem('temp_email');
        localStorage.removeItem('temp_password');
        localStorage.setItem("name",data.name);
        localStorage.setItem("role",data.role);
        localStorage.setItem("token",data.token);
        localStorage.setItem("account",data.account);
        localStorage.setItem("picture",data.picture?.url ?? '');
        
        this.router.navigate(['/planificador/dashboard']);
        this.spinner.hide();
    }, err =>{
      this.spinner.hide();
        console.log(err);
        this.router.navigate(['/hogar']);
      })
  }

  getType(type:string){
    if(type=='tipoPlani')
      return "Planificador";
    else if(type=='tipoProo')
      return "Proveedor";
    else
      return ""
  }

}
