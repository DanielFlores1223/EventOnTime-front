import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PlanesBuySelectorComponent } from './tabs/planes-buy-selector/planes-buy-selector.component';
import { ContactanosEmpresarialComponent } from '../contactanos-empresarial/contactanos-empresarial.component';
@Component({
  selector: 'app-compra-plan',
  templateUrl: './compra-plan.component.html',
  styleUrls: ['./compra-plan.component.scss']
})
export class CompraPlanComponent implements AfterViewInit {

  @ViewChild( PlanesBuySelectorComponent ) planesBSComponent: any;
  @ViewChild( ContactanosEmpresarialComponent ) contactanosComponent: any;

  tabSelected = 0;
  infoPayment = {
    numberCard: '',
    nameOwnerCard: '',
    expiration: '00/00',
    cvc: '',
    typeAccount: 'Premium',
  }

  createCompany = { workstation: '', company: '' }

  constructor() { }

  ngAfterViewInit(): void {
      this.infoPayment.typeAccount = this.planesBSComponent.planSelected;
      this.createCompany = this.contactanosComponent.createCompany;
  }

  setTabSelected( value: number ) {
    this.tabSelected = value;
  }

  recibePlanSelected($event: string) {
    this.infoPayment.typeAccount = $event;

    if ($event === 'Premium') {
      this.createCompany.company = '';
      this.createCompany.workstation = '';
    }

  } 

  receiveCompany($event: any) {
    this.createCompany = $event;
  }

  receivePaymentInfo($event: any) {
    this.infoPayment = $event;
  }

}
