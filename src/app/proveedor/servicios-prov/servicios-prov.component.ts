import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Response } from '../../models/Response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios-prov',
  templateUrl: './servicios-prov.component.html',
  styleUrls: ['./servicios-prov.component.scss']
})
export class ServiciosProvComponent implements OnInit {

  services: Array<any> = [];
  
  //PAGINATION
  search = '';
  from = 0;
  total = 0;
  currentPage = 1;
  btns: Array<any> = [];
  //END PAGINATION

  constructor( private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch( from: number = 0 ) {

    this.serviceService.getSearch( this.search, from ).subscribe(
      {
        next: (res: any) => {
            this.getPagination( res.result.total );
            this.services = res.result.services;
        },
        error: err => {console.log(err)}
      }
    );

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

  delete_service(id:any){
    this.serviceService.deleteService(id)
      .subscribe(res=>{
        console.log(res);
        this.getSearch();
        //this.router.navigate(['/proveedor/servicios']);

      },
      err=>{
        console.log(err);
      })
  }

  update_service(id:any){
    console.log(id);
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
