import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Event } from 'src/app/models/event';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  user_token = "";

  API_URI = 'https://eventontime.herokuapp.com/api';

  private _create_event = `${this.API_URI}/event`;
  private _get_my_events = `${this.API_URI}/event/my/events?limit=5&from=0&pagination=true`;
  
  headers= new HttpHeaders()
    .set('Authorization', this.getToken());


  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken(): string{
    if(localStorage.getItem('token')){
      return localStorage.getItem('token') || "";
    }else{
      return '';
    }
  }

  get_user_events(){
    return this.http.get<any>(this._get_my_events,{ 'headers': this.headers })
  }
}
