import { Component, OnInit } from '@angular/core';
import { Response } from '../../models/Response';
import { MyProfile } from '../../models/user';
import { UserService } from '../../services/user.service';
import { alertError } from '../../helpers/show-alerts';

@Component({
  selector: 'app-plan-pago',
  templateUrl: './plan-pago.component.html',
  styleUrls: ['./plan-pago.component.scss']
})
export class PlanPagoComponent implements OnInit {

  token: string = localStorage.getItem('token') ?? '';
  user: MyProfile = { uid: '',
                      name: '',
                      email: '',
                      google: false,
                      favorites: [],
                      status: false,
                      account: '',
                      role: '',  };


  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() {
      this.userService.getMyProfile( this.token ).subscribe( 
        {
          next: ( res: Response ) => this.user = res.result,
          error: err => alertError() 
        }
      )
  }

}
