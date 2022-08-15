import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NewUser } from 'src/app/models/newUser';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Variant, showAlert } from '../../helpers/show-alerts';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  newUser : NewUser={
    "name":"",
    "email":"",
    "password":"",
    "account":"Gratuito",
    "role":"Planificador"
  };

  util={
    "passAlert" : false,
    "repited_pass" : ""
  }
  
  constructor(private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.spinner.show();
    if(this.validateUser()==true){
      localStorage.setItem("temp_name",this.newUser.name);
      localStorage.setItem("temp_email",this.newUser.email);
      localStorage.setItem("temp_password",this.newUser.password);
      //localStorage.setItem("picture",'');
      this.router.navigate(['/tipo-usu']);
      this.spinner.hide();
      //ALERTA DE CORRECTO
      showAlert( 'Información correcta', Variant.success );
    }else{
      this.spinner.show();
      console.log(this.util.repited_pass);

      //ALERTA DE ERROR
      showAlert( 'Información incorrecta', Variant.error );
      //this.router.navigate(['/hogar']);
      this.spinner.hide();
    }
  }

  validateUser(){
    if(this.newUser.name != "" && this.newUser.email !="" && this.newUser.password && this.util.repited_pass!=""){
      if(this.newUser.password==this.util.repited_pass){
        return true;
        this.util.passAlert=true;
      }else
        return false;
    }else{
      return false;
    }
  }

}
