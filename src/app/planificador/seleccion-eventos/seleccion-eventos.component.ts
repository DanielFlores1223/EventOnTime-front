import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Variant, showAlert, showAlertToast } from '../../helpers/show-alerts';

@Component({
  selector: 'app-seleccion-eventos',
  templateUrl: './seleccion-eventos.component.html',
  styleUrls: ['./seleccion-eventos.component.scss']
})
export class SeleccionEventosComponent implements OnInit {

  token = localStorage.getItem('token') ?? '';
  typeAccount = 'Gratuito';

  constructor( private userService: UserService ,private router: Router ) { }

  ngOnInit(): void {
    this.getMyTypeAccount();
  }

  chooseType( type: string = '' ) {
    localStorage.setItem( 'tempTypeEvent', type );
    this.router.navigate(['/planificador/eventos/add']);
  }

  getMyTypeAccount() {
    this.userService.getMyProfile( this.token ).subscribe(
      {
        next: res => { this.typeAccount = res.result.account },
        error: err => {
              console.log(err)
              showAlert( err.error.msg, Variant.error );
        }
      }
    )
  }

}
