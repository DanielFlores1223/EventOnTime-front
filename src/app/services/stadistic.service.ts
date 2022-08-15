import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class StadisticService {

  private API_URI = 'https://eventontime.herokuapp.com/api/stadistic';

  constructor( private http: HttpClient) { }

  getDashboardPlannerInfo( token: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<Response>( `${this.API_URI}/dashboard/planner`, { headers } );
  }

  getDashboarProviderInfo( token: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<Response>( `${this.API_URI}/dashboard/provider`, { headers } );
  }

}
