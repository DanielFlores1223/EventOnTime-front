import { Component,Input, OnInit } from '@angular/core';

interface SidebarToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-dashboard-planificador',
  templateUrl: './dashboard-planificador.component.html',
  styleUrls: ['./dashboard-planificador.component.scss']
})
export class DashboardPlanificadorComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  onToggleSideNav(data: SidebarToggle ):void{
    this.isSideNavCollapsed=data.collapsed;
    this.screenWidth=data.screenWidth;
    console.log(this.isSideNavCollapsed);
    console.log(this.screenWidth);
  }

  getBodyClass():string{
    console.log("Cargando clase")
    console.log("Dashboard: "+this.isSideNavCollapsed);
    console.log("Dashboard: "+this.screenWidth);
    let styleClass = '';
    if(this.isSideNavCollapsed && this.screenWidth >768){
      styleClass = 'body-trimmed';
    }else if(this.isSideNavCollapsed && this.screenWidth <=768 && this.screenWidth >0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }



}
