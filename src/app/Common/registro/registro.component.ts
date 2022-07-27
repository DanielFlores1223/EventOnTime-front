import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NewUser } from 'src/app/models/newUser';
import { Router } from '@angular/router';

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
  
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  registerUser(){
    if(this.validateUser()==true){
      localStorage.setItem("temp_name",this.newUser.name);
      localStorage.setItem("temp_email",this.newUser.email);
      localStorage.setItem("temp_password",this.newUser.password);
      this.router.navigate(['/tipo-usu']);
    }else{
      console.log(this.util.repited_pass);
      this.router.navigate(['/hogar']);
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
