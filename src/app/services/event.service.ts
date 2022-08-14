import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/Evento';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  API_URI = 'https://eventontime.herokuapp.com/api/event';

  private _create_event = `${this.API_URI}`;
  
  constructor(private http: HttpClient) {
    this.getToken();
  }

  createEvent( token = '', data: Evento ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<Response>( `${this._create_event}`, data, { headers } );
  }
  
  getToken(): string{
    if(localStorage.getItem('token')){
      return localStorage.getItem('token') || "";
    }else{
      return '';
    }
  }

  getSearch(token = '', search = '', from=0, limit=5,  pagination=true ) {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.get( `${this.API_URI}/my/events?search=${search}&limit=${limit}&from=${from}&pagination=${pagination}`,{ 'headers': headers});
  }

  getEventById(token='',id:string=''){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.API_URI}/${id}`,{'headers': headers});
  }

}
