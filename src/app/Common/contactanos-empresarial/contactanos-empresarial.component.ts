import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-contactanos-empresarial',
  templateUrl: './contactanos-empresarial.component.html',
  styleUrls: ['./contactanos-empresarial.component.scss']
})
export class ContactanosEmpresarialComponent implements OnInit {

  @Input() companyInput = { workstation: '', company: '' };
  @Output() createCompanyEvent = new EventEmitter<{workstation: string, company: string}>();
  
  public createCompany = { workstation: '', company: '' };
                        
  constructor() { }

  ngOnInit(): void {

    if( this.companyInput.company !== '' && this.companyInput.workstation !== '' ) {
      this.createCompany.company = this.companyInput.company;
      this.createCompany.workstation =  this.companyInput.workstation
    }

  }

  setcreateCompanyEvent() {
    this.createCompanyEvent.emit( this.createCompany );
  }

}
