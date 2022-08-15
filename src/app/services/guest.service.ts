import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private API_URI = 'https://eventontime.herokuapp.com/api/guest';

  constructor( private http: HttpClient ) { }

  deleteGuest( token: string, id: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete<Response>( `${this.API_URI}/${id}`, { headers } );
    
  }
}
