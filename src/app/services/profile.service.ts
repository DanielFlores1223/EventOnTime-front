import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  API_URI = 'https://eventontime.herokuapp.com/api/user';
  constructor(private http: HttpClient) { }

  getProfileInfo(token = ''){
    
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.get(`${this.API_URI}/my/profile`,{ 'headers': headers})
  }

  updateMyInfo(token=''){

  }
}
