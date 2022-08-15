import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { UserService } from '../../../services/user.service';
import { PictureService } from '../../../services/picture.service';
import { EventService } from '../../../services/event.service';
import { GuestService } from '../../../services/guest.service';
import { Evento } from '../../../models/Evento';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Variant, showAlert, showAlertToast } from '../../../helpers/show-alerts';
import { Guest } from 'src/app/models/Guest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventosform',
  templateUrl: './eventosform.component.html',
  styleUrls: ['./eventosform.component.scss']
})

export class EventosformComponent implements OnInit {

  favorites: Array<any> = []; // this variable saves services and favorites
  token: string = localStorage.getItem('token') ?? '';
  accountType = localStorage.getItem('account') ?? '';
  guests: Array<Guest> = [];
  tabsModal = 0;
  serviceInfo: any;
  servicesData: Array< { name: string, id: string, _id?: string } > = [];
  files: File[] = [];
  param_id="";
  editing=false;
  addGuestPlus=false;
  eventCreate: any = { address: '', 
                         dateFinish: '', 
                         dateStart: '', 
                         description: '', 
                         dressCode: '', 
                         googleMaps: '',
                         name: '',
                         type: localStorage.getItem('tempTypeEvent') ?? 'Personal'
                       }
  errorsForm: any = {
                          address: '', 
                         dateFinish: '', 
                         dateStart: '', 
                         description: '', 
                         dressCode: '', 
                         googleMaps: '',
                         name: '',
                         type: '',
                         imagenes: '',
                         invitados: '',
                         servicios: ''
                      }
   editImages : any = [];

  //PAGINATION
  search = '';
  from = 0;
  total = 0;
  currentPage = 1;
  btns: Array<any> = [];
  //END PAGINATION

  constructor( private serviceService: ServiceService, 
               private spinner: NgxSpinnerService,
               private userService: UserService,
               private pictureService: PictureService,
               private eventService: EventService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private guestService: GuestService ) { }

  ngOnInit(): void {
    this.getSearch();
    this.getParams();
  }

  
  addedAGuest( ) {
    this.addGuestPlus = true;
  }

  //DROP ZONE
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  //DROP ZONE

  //CREATE A EVENT

  saveEvent() {

    if ( !this.validateFields() || !this.validateDates() ) {
      return showAlert( 'El formulario está incompleto...', Variant.error );
    }
    Swal.fire({
      title: '¿Desea Crear el Evento?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const idServices = this.servicesData.map( s => s.id );
        const data = { ...this.eventCreate, guests: this.guests, services: idServices } 
        this.spinner.show();
        this.eventService.createEvent( this.token, data ).subscribe(
          {
            next: res => {
              this.saveImgs( res.result._id, res.msg );
            },
            error: err => {
              console.log(err)
              this.spinner.hide();
              showAlert( err.error.msg, Variant.error );
            }
          }
        )
        Swal.fire('Evento Creado!', '', 'success')
      } else if (result.isDenied) {
        
        Swal.fire('Cancelando...', '', 'info');
        this.router.navigate(['/planificador/eventos']);
      }
    })
  }

  saveImgs( id: string = '', msg = '' ) {
    
    this.pictureService.addImg( 'Event', id, this.files ).subscribe(
      {
        next: async (res) => {
          this.spinner.hide();

          await Swal.fire({
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 3000,
            backdrop: `
              rgba(0,0,123,0.4)
              url("../../../assets/Imagenes/confe2.gif")
              left top
              repeat
            `
          });

          this.router.navigate(['/planificador/eventos']);
        },
        error: err => {
            console.log(err)
            this.spinner.hide();
            showAlert( err.error.msg, Variant.error );
        },
      }
    )

  }


  addClassesValidate() {
    const form = document.querySelector('#formEvent');
    form?.classList.add('needs-validation', 'was-validated');
    this.validateFields();
    this.validateDates();
  }

    //Validations for creating a event
    validateDates(): boolean {

      if( this.eventCreate.dateStart === '' ) {
        this.errorsForm.dateStart = 'Este campo es obligatorio';
        //console.log('Campos de fecha vacios');
        return false;
      }

      if(  this.eventCreate.dateFinish === '' ) {
        this.errorsForm.dateFinish = 'Este campo es obligatorio';
        //console.log('Campos de fecha vacios');
        return false;
      }
      
      const d1 = new Date( this.eventCreate.dateStart ).getTime();
      const d2 = new Date( this.eventCreate.dateFinish ).getTime();

      if( d1 >= d2 ) {
        this.errorsForm.dateStart = 'La fecha de inicio no debe ser mayor a la de fin';
        console.log('Rango de fechas incorrectas');
        return false;
      } 

      return true;
    }
    //Validations for creating a event

    validateFields(): boolean {
      let count = 0;
      const obj: any = this.eventCreate;
      for (const key in obj) {

          if( obj[ key ] === '') {
            this.errorsForm[ key ] = 'Este campo es obligatorio'
            count++;
          } 
      }

      if( this.guests.length === 0 ) {
        this.errorsForm.invitados = 'Debes agregar invitados al evento';
        count++;
      }
        

      if( this.files.length === 0 ) {
        this.errorsForm.imagenes = 'Debes agregar al menos una imagen';
        count++;
      }
        

      // The services are not required
      /*if( this.servicesData.length === 0 )
        this.errorsForm.servicios = 'Debes agregar servicios al evento';*/
      if( count > 0 ) 
        return false;

      return true;
    }

  getParams(){
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.param_id=params['id'];
      this.editing=true;
      this.eventService.getEventById(this.token,this.param_id).subscribe(
        res =>{
          this.eventCreate=res.result;
          this.guests=res.result.guests;
          console.log(this.guests)
          this.eventCreate.dateStart= this.formatDate(res.result.dateStart)
          this.eventCreate.dateFinish= this.formatDate(res.result.dateFinish)
          this.servicesData=res.result.services;
          console.log(this.servicesData)
          this.editImages = res.result.pictures;
          //this.files=res.result.pictures;
          console.log(this.eventCreate);
        },
        err =>{
          showAlert( err.error.msg, Variant.error );
          console.log(err);
        }
      )
    }
  }

  //Event edit functions
  deletAGuest( id: any ) {
    console.log(id)

    this.guestService.deleteGuest( this.token, id ).subscribe(
      {
        next: res => {
          showAlert( res.msg, Variant.success );
          this.getParams();
        },
        error: err => {
          showAlert( err.error.msg, Variant.error );
          console.log(err);
        }
      }
    );

  }

  deleteSeviceOfEvent( serv: any ) {
    console.log(Object.keys( serv ).length);

    if( Object.keys( serv ).length == 2 ) 
      return this.removeService( serv.id ); 

    this.eventService.deleteServiceBelongsToEvent( this.token, this.eventCreate._id ?? '', serv._id ).subscribe(
      {
        next: res => {
          showAlert( res.msg, Variant.success );
          this.getParams();
        },
        error: err => {
          showAlert( err.error.msg, Variant.error );
          console.log(err);
        }
      }
    )
  }

  formatDate(date: string){
    var i=0;
    var arr =[];
    arr = date.split(":",2)
    //console.log(`${arr[0]}:${arr[1]}`);
    return arr[0]+":"+arr[1];
  }

  updateEvent(){
    Swal.fire({
      title: '¿Desea Actualizar el Evento?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.updateEventConsult();        
      
      } else if (result.isDenied) {
        
        Swal.fire('Cancelando...', '', 'info');
        //this.router.navigate(['/planificador/eventos']);
      }
    })
    console.log(this.eventCreate)
  }

  updateEventConsult() {
    
    const idServices = this.servicesData.map( s => s.id );

    const { guests, ...rest } = this.eventCreate;
    let data = {}
    console.log(this.addGuestPlus)
    if( this.addGuestPlus )
      console.log('poner los nuevos guest')
    else
       data = { ...rest, services: idServices } 

    this.spinner.show();

    console.log(data)
    
    this.eventService.updateEvent( this.token, this.eventCreate._id ?? '', data ).subscribe({
      next: res => {

        if( this.files.length > 0 )
          this.saveImgs(this.eventCreate._id, res.msg );
        else {
          showAlert( res.msg, Variant.success );
          this.spinner.hide();
          this.router.navigate(['/planificador/eventos']);
        }

      },
      error: err => {
        showAlert( err.error.msg, Variant.error );
        this.spinner.hide();
      }
    });

  }

  //CREATE A EVENT

  addGuest( values: Guest, form: any ) {
    
    const exist = this.guests.some( g => g.email === values.email );
    if (exist) 
      return showAlert( 'Este correo ya está en tu lista de invitados', Variant.error );
    
    this.guests = [ ...this.guests, values ];
    showAlertToast( 'Invitado agregado a la lista', Variant.success );
    form.reset()
    console.log(this.guests)
  }

  removeGuest( email: string ) {

    const guestsNew = this.guests.filter( g => g.email != email );
    this.guests = guestsNew;
    
    showAlertToast( 'Invitado eliminado de la lista', Variant.success );

  }

  addService( name: string, id: string ) {

    const data = { name, id };

    const exist = this.servicesData.some( s => s.id === id );
    if (exist) 
      return showAlert( 'Este servicio ya está en tu lista', Variant.error );
    
    this.servicesData = [ ...this.servicesData, data ];
    showAlertToast( 'Servicio agregado a la lista', Variant.success );

  }

  removeService( id: string ) {

    const servicesNew = this.servicesData.filter( g => g.id != id );
    this.servicesData = servicesNew;
    
    showAlertToast( 'Servicio eliminado de la lista', Variant.success );
  }

  changeTabModal( value: number = 0 ) {
    this.tabsModal = value;
    this.currentPage = 1;
    this.search = '';
    this.getSearch();
  }

  getSearch( from: number = 0 ) {

    if (this.tabsModal === 0) {
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
    
    } else {
      //this.spinner.show();
        this.serviceService.getSearch( this.search, from ).subscribe(
          {
            next: (res: any) => {
                this.getPagination( res.result.total );
                this.favorites = res.result.services;
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
  }

  getById( id: string ) {
    
    this.spinner.show();
    this.serviceService.getById( id ).subscribe( 
      {
        next: (res: any) => {
          this.serviceInfo = res.result;
          this.spinner.hide();
          console.log(res)
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
