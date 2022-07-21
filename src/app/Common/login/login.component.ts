import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { NewUser } from 'src/app/models/newUser'
import { ActivatedRoute, Router } from '@angular/router';

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

  newUser : NewUser={
    "name":"",
    "email":"",
    "password":"",
    "account":"",
    "role":""
  };

  constructor(private _auth: AuthService, private router: Router, private activedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this._auth.message();
    const params = this.activedRoute.snapshot.params;
  }

  login(){
    this._auth.loginUser(this.user)
      .subscribe(res =>{
        console.log(res)
      },err=>{
        console.log(err)
      })
  }

  registerUser(){
    this._auth.registerUser(this.newUser)
      .subscribe( res =>{
        console.log(res);
      }, err =>{
        console.log(err);
      })
  }
}
