import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
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

  constructor(private _auth: AuthService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._auth.message();
    const params = this.activedRoute.snapshot.params;
  }

  login(){
    this._auth.loginUser(this.user)
      .subscribe(res =>{
        const data = res.result;
        
        console.log(data);
        localStorage.setItem("name",data.name);
        localStorage.setItem("role",data.role);
        localStorage.setItem("token",data.token);
        localStorage.setItem("account",data.account);
        localStorage.setItem("picture",data.picture);
        this.router.navigate(['/planificador/dashboard']);
      },err=>{
        console.log(err)
      })
  }
}
