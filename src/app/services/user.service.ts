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

  addFavorites( token: string, idService: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.post<Response>( `${this.API_URI}/user/add/favorites`, { idService }, { headers } );
  }

  getFavorites( token: string, search = '', from = 0 ) {

    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.get<Response>( `${this.API_URI}/user/get/favorites?search=${search}&limit=5&from=${from}`, { headers } );
  }

  removeFavorites( token: string, idService: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.put<Response>( `${this.API_URI}/user/remove/favorites`, { idService }, { headers } );
  }
   
}
