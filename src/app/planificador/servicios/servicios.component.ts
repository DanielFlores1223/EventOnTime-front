import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Response } from '../../models/Response';
import { NgxSpinnerService } from "ngx-spinner";
import { Variant, showAlert } from '../../helpers/show-alerts';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  services: Array<any> = [];
  
  //PAGINATION
  search = '';
  from = 0;
  total = 0;
  currentPage = 1;
  btns: Array<any> = [];
  //END PAGINATION

  serviceInfo: any;

  constructor( private serviceService: ServiceService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch( from: number = 0 ) {

    //this.spinner.show();
    this.serviceService.getSearch( this.search, from ).subscribe(
      {
        next: (res: any) => {
            this.getPagination( res.result.total );
            this.services = res.result.services;
            this.spinner.hide();
        },
        error: err => {
          //this.spinner.hide();
          console.log(err)
          showAlert( err.error.msg, Variant.error );
        }
      }
    );

  }

  getById( id: string ) {
    
    this.spinner.show();
    this.serviceService.getById( id ).subscribe( 
      {
        next: (res: any) => {
          this.serviceInfo = res.result;
          this.spinner.hide();
        },
        error: err => { 
          this.spinner.hide();
          console.log(err) 
          showAlert( err.error.msg, Variant.error );
        }
      }
    )
  }

  resetPagination() {
    if ( this.search === '' ) {
      this.currentPage = 1;
    }
  }

  likeService(event: any) {
    event.stopPropagation();
    console.log('click')
  }

  //PAGINATION
  getPagination( total = 0, limit = 5 ) {

    this.btns = [];
    const numbBtn = Math.ceil( total / limit );

    for (let i = 0; i < numbBtn; i++) {
        this.btns = [ ...this.btns, { textBtn: (i + 1), from: ( i * limit ) } ];
    }

  }

  getCurrentPage( c: number = 1 ) {
    this.currentPage = c;
  }

  nextPage() {

    this.currentPage++;

    if (this.currentPage > this.btns.length) {
        this.currentPage = this.btns.length;
    }

    const from = this.btns[ (this.currentPage - 1)].from;
    this.getSearch( from );

  }

  previousPage() {

    this.currentPage--;

    if ( this.currentPage < 1 ) {
      this.currentPage = 1;
    }

    const from = this.btns[(this.currentPage - 1 )].from;
    this.getSearch( from );

  }

  //END PAGINATION

}
