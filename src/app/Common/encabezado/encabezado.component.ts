import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor() { }

  isLogged=false;
  role = "";

  ngOnInit(): void {
    this.isLogged= this.verifyToken();
  }

  verifyToken(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }

  }

}
