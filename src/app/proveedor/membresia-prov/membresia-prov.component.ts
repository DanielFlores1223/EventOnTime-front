import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { Response } from '../../models/Response';
import { PaymentService } from '../../services/payment.service';
import { getMonth } from '../../helpers/getMonth';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-membresia-prov',
  templateUrl: './membresia-prov.component.html',
  styleUrls: ['./membresia-prov.component.scss']
})
export class MembresiaProvComponent implements OnInit {

  month:string = '';
  year:string = '';
  expirationCreditCard = '';
  regexCreditCard = /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/;
  validated: boolean = false;
  optionLastCreditCard = false;
  token: string = localStorage.getItem('token') ?? '';

  infoLastPayment: Payment = {
        amount: 0,
        dateStart: '',
        dateEnd: '',
        numberEvents: 0,
        typeAccount: '',
  };

  paymentCreate = {
    numberCard: '',
    nameOwnerCard: '',
    expiration: '00/00',
    cvc: '',
    typeAccount: 'Premium'
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

  constructor( private paymentService: PaymentService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.getInfoPayment();
    this.generateArraysExpirate();
  }

  getInfoPayment() {

    this.spinner.show();
    this.paymentService.getInfoLastPayment( this.token ).subscribe(
      {
        next: ( res: Response ) => { 
                                      this.infoLastPayment = res.result;
                                      this.processDates(res.result)
                                      this.spinner.hide();
                                   },
        error: err => { 
                        this.spinner.hide();
                      }
      }
    )

  }

  getLastCreditCard() {

    if( !this.optionLastCreditCard ) {
      this.paymentCreate.numberCard = '';
      this.paymentCreate.nameOwnerCard = '';
      return;
    }
      
    this.spinner.show();
    this.paymentService.getLastCreditCard( this.token ).subscribe(
      {
        next: ( res: Response ) => {
          this.paymentCreate.numberCard = res.result.numberCard;
          this.paymentCreate.nameOwnerCard = res.result.nameOwnerCard;
          this.spinner.hide();
        },
        error: err => { 
                        this.spinner.hide();
                      }
      }
    );

  }

  createPayment() {

    this.spinner.show();
    this.paymentService.createPayment( this.paymentCreate, this.token ).subscribe(
      {
        next: ( res: Response ) => {
          this.reload();
          this.spinner.hide();
        },
        error: err => {
                        this.spinner.hide();
                      }
      }
    );

  }

  processDates( data: any ) {
      const dateRealStart = new Date(data.dateStart).toLocaleDateString();
      const dateRealEnd = new Date(data.dateEnd).toLocaleDateString();

      this.infoLastPayment.dateStart = dateRealStart;
      this.infoLastPayment.dateEnd = dateRealEnd;
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
    this.paymentCreate.typeAccount = 'Premium';
    this.paymentCreate.cvc = '';
    this.month = '';
    this.year = '';
    this.expirationCreditCard = '';
    this.optionLastCreditCard = false;
    this.getInfoPayment();
  }

  addClassesValidate() {
    const form = document.querySelector('.formPago');
    form?.classList.add('needs-validation', 'was-validated');
    this.validateForm();
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

}
