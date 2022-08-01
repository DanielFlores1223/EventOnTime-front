import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  API_URI = 'https://eventontime.herokuapp.com/api';

  private _registerURL = `${this.API_URI}/event`;
  private _loginURL = `${this.API_URI}/auth`;


  constructor() { }
}
