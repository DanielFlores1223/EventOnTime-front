import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-plan',
  templateUrl: './body-plan.component.html',
  styleUrls: ['./body-plan.component.scss']
})
export class BodyPlanComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth =0;

  constructor() { }

  ngOnInit(): void {
  }

  getBodyClass():string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <=768 && this.screenWidth >0){
      styleClass = 'body-md-screen'
    }
    return styleClass;

  }

}
