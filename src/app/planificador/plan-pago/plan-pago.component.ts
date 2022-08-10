import { Component, OnInit } from '@angular/core';
import { Response } from '../../models/Response';
import { MyProfile } from '../../models/user';
import { UserService } from '../../services/user.service';
import { showAlert, Variant } from '../../helpers/show-alerts';
import { NgxSpinnerService } from "ngx-spinner";

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


  constructor( private userService: UserService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() {
      this.spinner.show();
      this.userService.getMyProfile( this.token ).subscribe( 
        {
          next: ( res: Response ) => { 
                                        this.user = res.result;
                                        this.spinner.hide();
                                     },
          error: err => { 
                          showAlert( err.error.msg, Variant.error ); 
                          this.spinner.hide();
                        }
        }
      )
  }

}
