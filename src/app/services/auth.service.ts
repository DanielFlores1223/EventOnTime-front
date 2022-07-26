import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { User } from 'src/app/models/user';
import { NewUser } from 'src/app/models/newUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'https://eventontime.herokuapp.com/api';

  private _registerURL = `https://eventontime.herokuapp.com/api/user/register`;
  private _loginURL = `https://eventontime.herokuapp.com/api/auth`;


  constructor(private http: HttpClient) { }

  message(){
    console.log(`Servico Iniciado`)
  }

  loginUser(user : User){
    return this.http.post<any>(this._loginURL,user)
  }

  registerUser(user : NewUser){
    return this.http.post<any>(this._registerURL,user);
  }

  loggedIn(){
    return !! localStorage.getItem('token');
  }
}
