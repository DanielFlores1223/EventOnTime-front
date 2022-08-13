import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private API_URI = 'https://eventontime.herokuapp.com/api/picture';

  constructor( private http: HttpClient ) { }

  addImg( collection: string, id: string, files: Array<File> ) {

      const formData = new FormData();
      for (const file of files) {
        formData.append('image',file,file.name)
      }

      return this.http.post( `${this.API_URI}/${collection}/${id}`, formData );
      //return this.http.post( `${this.API_URI}/Service/62f4a91ee8c45d50ac796d1e`, formData );
  }

}
