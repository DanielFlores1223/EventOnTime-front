import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private API_URI = 'https://eventontime.herokuapp.com/api/payment';
  //private API_URI = 'http://localhost:3000/api/payment';

  constructor( private http: HttpClient ) { }

  getInfoLastPayment( token: string ) {
      const headers = new HttpHeaders({
        'Authorization': token
      });

      return this.http.get<Response>( `${this.API_URI}/infoLastPayment`, { headers } );
  }

  getLastCreditCard( token: string ) {
      const headers = new HttpHeaders({
        'Authorization': token
      });

      return this.http.get<Response>( `${this.API_URI}/lastCreditCard`, { headers } );
  }

  createPayment( payment: Payment, token: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<Response>( `${this.API_URI}`, payment, { headers } );
  }
}
