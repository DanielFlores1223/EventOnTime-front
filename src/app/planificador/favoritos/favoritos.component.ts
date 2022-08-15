import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { Response } from '../../models/Response';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Variant, showAlert } from '../../helpers/show-alerts';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  favorites: Array<any> = [];
  token: string = localStorage.getItem('token') ?? '';
  
  //PAGINATION
  search = '';
  from = 0;
  total = 0;
  currentPage = 1;
  btns: Array<any> = [];
  //END PAGINATION

  serviceInfo: any;

  constructor( private serviceService: ServiceService, 
               private spinner: NgxSpinnerService,
               private userService: UserService) { }

  ngOnInit(): void {
    this.getSearch();
  }

  removeFav( id = '' ) {

    this.spinner.show();
    this.userService.removeFavorites( this.token, id ).subscribe(
      {
        next: res => {
          console.log(res);
          this.spinner.hide();
          Swal.fire({
            title: res.msg,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-right'
          });

      
          const fromAct = ( this.currentPage - 1 ) * 5;
          this.getSearch(fromAct);

        },
        error: err => {
          console.log(err);
          this.spinner.hide();
          //Alert Toast
          Swal.fire({
            title: err.error.msg,
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            position: 'top-right'
          });
        }, 
      }
    )
  }

  getSearch( from: number = 0 ) {

    //this.spinner.show();
    this.userService.getFavorites( this.token, this.search, from ).subscribe(
      {
        next: (res: any) => {
            this.getPagination( res.result.total );
            this.favorites = res.result.services;
            this.spinner.hide();

            if( this.favorites.length == 0 )
            return this.previousPage();
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
