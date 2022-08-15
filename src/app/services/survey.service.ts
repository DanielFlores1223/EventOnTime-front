import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private API_URI = 'https://eventontime.herokuapp.com/api/survey';

  constructor( private http: HttpClient ) { }

  answerSurvey( token: string, idSurvey: string, data: { answers: Array<boolean>, comments: string  } ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put<Response>( `${this.API_URI}/answerSurvey/${idSurvey}`, data, { headers } );

  }

  getPendingSurveys( token: string ) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<Response>( `${this.API_URI}/pending/surveys`, { headers } );
  }

}
