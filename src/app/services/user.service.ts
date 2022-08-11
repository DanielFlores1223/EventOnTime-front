import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URI = 'https://eventontime.herokuapp.com/api';

  constructor( private http: HttpClient ) { }

  getMyProfile( token: string ) {
    
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.get<Response>( `${this.API_URI}/user/my/profile`, { headers } );

  }

  updateMyProfile( token: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.put<Response>( `${this.API_URI}/user/my/profile`, {  } ,{ headers } );
  }

  updateMyProfileCompany( token: string, data: { workstation: string, company:string } ) {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.put<Response>( `${this.API_URI}/user/profile`, data, { headers } );
  }
   
}
