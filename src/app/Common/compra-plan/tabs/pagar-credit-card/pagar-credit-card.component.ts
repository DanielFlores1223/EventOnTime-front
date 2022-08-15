import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '../../../../models/Response';
import { PaymentService } from '../../../../services/payment.service';
import { UserService } from '../../../../services/user.service';
import { getMonth } from '../../../../helpers/getMonth';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Variant, showAlert } from '../../../../helpers/show-alerts';

@Component({
  selector: 'app-pagar-credit-card',
  templateUrl: './pagar-credit-card.component.html',
  styleUrls: ['./pagar-credit-card.component.scss']
})
export class PagarCreditCardComponent implements OnInit {

  @Input() typeAccountInput = '';
  @Input() createCompanyInput = { workstation: '', company: '' }
  @Input() paymentCreateInput = { numberCard: '', 
                                  nameOwnerCard: '', 
                                  expiration: '',
                                  cvc: '', 
                                  typeAccount: ''
                                }

  @Output() paymentCreateEvent = new EventEmitter< { 
                                                     numberCard: string, 
                                                     nameOwnerCard: string, 
                                                     expiration: string,
                                                     cvc: string,
                                                     typeAccount: string
                                                     } >();

  month:string = '';
  year:string = '';
  expirationCreditCard = '';
  regexCreditCard = /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/;
  validated: boolean = false;
  optionLastCreditCard = false;
  token: string = localStorage.getItem('token') ?? '';

  paymentCreate = {
    numberCard: '',
    nameOwnerCard: '',
    expiration: '00/00',
    cvc: '',
    typeAccount: 'Premium'
  }

  createCompany = {
    company: '',
    workstation: ''
  }

  errorsForm: any = {
    numberCard: '',
    nameOwnerCard: '',
    expiration: '',
    cvc: '',
  }

  configCreditCard = {
    name: '------------', valid: 'MM / YY'
  }

  months: Array<any> = [];
  years: Array<any> = [];

  constructor( private paymentService: PaymentService, 
               private spinner: NgxSpinnerService,
               private userService: UserService,
               private router: Router ) { }

  ngOnInit(): void {
    this.paymentCreate.typeAccount = this.typeAccountInput;
    this.generateArraysExpirate();

    this.createCompany = this.createCompanyInput;

    if( this.paymentCreateInput.numberCard !== '' || 
        this.paymentCreateInput.cvc !== '' ||
        this.paymentCreateInput.expiration !== '' ||
        this.paymentCreateInput.nameOwnerCard !== '' ) {

          this.paymentCreate.cvc = this.paymentCreateInput.cvc;
          this.paymentCreate.expiration = this.paymentCreateInput.expiration;
          this.paymentCreate.nameOwnerCard = this.paymentCreateInput.nameOwnerCard;
          this.paymentCreate.numberCard = this.paymentCreateInput.numberCard;

          const exp = this.paymentCreateInput.expiration.split('/');
          this.month = exp[0];
          this.year = exp[1];

        }
  }


  createPayment() {

    this.spinner.show();
    this.paymentService.createPayment( this.paymentCreate, this.token ).subscribe(
      {
        next: ( res: Response ) => {
          this.reload();

          if ( this.paymentCreate.typeAccount === 'Empresarial' ) {
            if( !this.validateCompanyInfo() ) return;
      
            //Recording info about user's company
            this.saveCompanyData( res.msg );
          
          } else {
            this.spinner.hide();
            this.router.navigate(['/planificador/dashboard']);
            showAlert( res.msg, Variant.success );
          } 

        },
        error: err => {
                        this.spinner.hide();
                        showAlert( err.error.msg, Variant.error );
                      }
      }
    );

  }

  saveCompanyData( msg: string ) {

      this.userService.updateMyProfileCompany( this.token, this.createCompany ).subscribe(
        {
          next: ( res: Response ) => {
            this.spinner.hide();
            this.router.navigate(['/planificador/dashboard']);
            showAlert( msg, Variant.success );
          },
          error: err => {
              this.spinner.hide();
              showAlert( err.error.msg, Variant.error );
          }
        }
      );
  }

  validateCompanyInfo(): boolean {
    if( this.createCompany.company !== '' || this.createCompany.workstation !== '' )
      return true;

    // show alert of error, "campos de la empresa están vacíos"
    this.spinner.hide();
    showAlert( 'Información de la empresa vacía', Variant.error );
    return false;
  }

  generateArraysExpirate() {

    //Generate months
    for (let i = 1; i <= 12; i++) {

        let index: string = `${i}`;
        
        if( i < 10 )
          index = `0${i}`;

        const m = getMonth( i );

        this.months = [ ...this.months, { value: index, month: m } ];
    }

    // Generate Years
    for (let i = 22; i < 42 ; i++) {
        this.years = [ ...this.years, { year:`20${i}`, value: `${i}` } ];
    }

  }

  changeExpiration( type: string ) {

      const ex = this.paymentCreate.expiration.split('/');
      let newValue = '';

      if( type === 'month' ) 
         newValue = `${this.month}/${ex[1]}`;
      else 
        newValue = `${ex[0]}/${this.year}`;

      this.paymentCreate.expiration = newValue;
      this.expirationCreditCard = `${this.month}${this.year}`

  }

  reload() {
    this.paymentCreate.expiration = '';
    this.paymentCreate.nameOwnerCard = '';
    this.paymentCreate.numberCard = '';
    this.paymentCreate.cvc = '';
    this.month = '';
    this.year = '';
    this.expirationCreditCard = '';
    this.optionLastCreditCard = false;
  }

  addClassesValidate() {
    const form = document.querySelector('.formPago');
    form?.classList.add('needs-validation', 'was-validated');
    this.validateForm();
    this.setPaymentCreateEvent();
  }

  validateForm() {
    
    let count = 0;
    const obj: any = this.paymentCreate;
    for (const key in obj) {

        if( obj[ key ] === '' || obj[ 'expiration' ] === '00/00') {
          this.errorsForm[ key ] = 'Este campo es obligatorio'
          count++;
        } 
    }

    if( !this.paymentCreate.numberCard.match( this.regexCreditCard ) && this.paymentCreate.numberCard !== '' ) {
      this.errorsForm[ 'numberCard' ] = 'Formato inválido'
      count++;
    }

    if (count > 0)
      this.validated = false;
    else 
      this.validated = true;
  }

  validateNumberCard() {
    if( !this.paymentCreate.numberCard.match( this.regexCreditCard ) ) {
      this.errorsForm[ 'numberCard' ] = 'Formato inválido';
    } else {
      this.errorsForm[ 'numberCard' ] = '';
    }
      
  }

  setPaymentCreateEvent() {
    this.paymentCreateEvent.emit( this.paymentCreate );
  }

}
