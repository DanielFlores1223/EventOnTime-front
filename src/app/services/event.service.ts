import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/Event';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  API_URI = 'https://eventontime.herokuapp.com/api';

  private _registerURL = `${this.API_URI}/event`;
  private _loginURL = `${this.API_URI}/auth`;

  constructor( private http: HttpClient ) { }

  createEvent( token = '', data: Event ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<Response>( `${this._registerURL}`, data, { headers } );
  }

}
