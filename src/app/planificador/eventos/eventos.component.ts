import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Evento } from 'src/app/models/Evento';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Variant, showAlert } from '../../helpers/show-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  sidebarToggle: boolean=false;

  eventos: Array<any> = [];
  token: string = localStorage.getItem('token') ?? '';
  accountType = localStorage.getItem('account') ?? '';
  //PAGINATION
  search = '';
  from = 0;
  total = 0;
  currentPage = 1;
  btns: Array<any> = [];
  //END PAGINATION

  serviceInfo: any;

  constructor(private eventService: EventService, private spinner: NgxSpinnerService, private router: Router ) { }


  /*eventos =[{
    id: "62e08bd622c947376ebee1b8",
    name: "Prueba1",
    code: "6212",
    description: "Prueba1",
    dateStart: "2022-07-25T00:00:00.000Z",
    dateFinish: "2022-07-26T00:00:00.000Z",
    googleMaps: "Prueba1",
    dressCode: "Prueba1",
    address: "Prueba1",
    services: [
        "62d710ce828e5e442b3a621d",
        "62d710ce828e5e442b3a621d"
    ],
    type: "Personal",
    status: true,
    planner: "62e08b0722c947376ebee1ab",
    __v: 0,
    pictures: [
        "pic1.png"
    ]
  }];
  */

  total_events=0;
  ngOnInit(): void {
    //this.get_events();
    this.get_my_events();
  }

  get_my_events(from: number = 0){
    this.eventService.getSearch(this.token, this.search, from).subscribe({
      next: (res: any) =>{
        this.getPagination( res.result.total );
        this.total_events=res.result.total;
        console.log(res)
        this.eventos = res.result.events;
        //this.spinner.hide();
      },
      error: err =>{
        //this.spinner.hide();
        console.log(err)
        //showAlert( err.error.msg, Variant.error );
      }
    })
  }

  resetPagination() {
    if ( this.search === '' ) {
      this.currentPage = 1;
    }
  }

  delete_event(id:any){
    Swal.fire({
      title: '¿Desea Eliminar el Evento?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(this.token,id).subscribe(
          res =>{
            console.log(res);
          },
          err =>{
            showAlert( 'Información incorrecta', Variant.error );
            console.log(err);
          }
        )
        Swal.fire('Se le notificara a los invitados que fue Cancelado el Evento', '', 'success')
        this.get_my_events();
      } else if (result.isDenied) {
        
        Swal.fire('Cancelando...', '', 'info');
        this.router.navigate(['/planificador/eventos']);
      }
    })
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
    this.get_my_events( from );

  }

  previousPage() {

    this.currentPage--;

    if ( this.currentPage < 1 ) {
      this.currentPage = 1;
    }

    const from = this.btns[(this.currentPage - 1 )].from;
    this.get_my_events( from );

  }

  //END PAGINATION

}
