import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private API_URI = 'https://eventontime.herokuapp.com/api/service';

  constructor( private http: HttpClient ) { 
    this.getToken();
  }

  getToken(): string{
    if(localStorage.getItem('token')){
      return localStorage.getItem('token') || "";
    }else{
      return '';
    }
  }

  getSearch( search = '', from=0, limit=5,  pagination=true ) {
    return this.http.get( `${this.API_URI}/search/regex?search=${search}&limit=${limit}&from=${from}&pagination=${pagination}` )
  }

  myServices(token='', from=0, limit=5,  pagination=true ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get( `${this.API_URI}/my/services?limit=${limit}&from=${from}&pagination=${pagination}`,{ 'headers': headers });
  }

  getById( id: string ) {
    return this.http.get( `${this.API_URI}/${id}` );
  }

  createService(token='',service: Service){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<any>(this.API_URI,service,{ 'headers': headers });
  }

  getServiceByID(id:string){
    return this.http.get<any>(`${this.API_URI}/${id}`)
  }

  updateService(token='', id:string,service: Service){
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.put(`${this.API_URI}/${id}`,service,{ 'headers': headers });
  }

  deleteService(token='', id:string){
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.delete(`${this.API_URI}/${id}`,{ 'headers': headers });
  }

}
