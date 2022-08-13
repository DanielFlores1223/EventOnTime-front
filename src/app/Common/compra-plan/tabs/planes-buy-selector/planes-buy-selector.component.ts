import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-planes-buy-selector',
  templateUrl: './planes-buy-selector.component.html',
  styleUrls: ['./planes-buy-selector.component.scss']
})
export class PlanesBuySelectorComponent implements OnInit {

  @Input() planSelectFromOther = '';
  @Output() planSelectedEvent = new EventEmitter<string>();

  public planSelected = 'Premium';

  constructor() { }

  ngOnInit(): void {
    
    if( this.planSelectFromOther !== '' ) 
      this.planSelected = this.planSelectFromOther;

  }

  setPlanSelected( value: string ) {
    this.planSelected = value;

    //Send the information to parent component
    this.planSelectedEvent.emit( this.planSelected );
  }

}
