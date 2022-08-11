import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private API_URI = 'https://eventontime.herokuapp.com/api/service';

  constructor( private http: HttpClient ) { }

  getSearch( search = '', from=0, limit=5,  pagination=true ) {
    return this.http.get( `${this.API_URI}/search/regex?search=${search}&limit=${limit}&from=${from}&pagination=${pagination}` )
  }
  
}
