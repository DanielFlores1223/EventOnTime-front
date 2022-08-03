import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

interface SidebarToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar-planificador',
  templateUrl: './sidebar-planificador.component.html',
  styleUrls: ['./sidebar-planificador.component.scss']
})
export class SidebarPlanificadorComponent implements OnInit {
  
  @Output() onToggleSideNav: EventEmitter<SidebarToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = true;
  navData=[
    {
      routerLink : 'planificador/favoritos',
      icon: 'fal fa-home',
      label: 'Mi Dashboard'
    }
  ]

  navClass = "content";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('account');
    localStorage.removeItem('picture');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    //this.ngOnInit();
    this.router.navigate(['/hogar']);
    
  }

  /*toggleSideBar(){
    if(this.toggle==false){
      this.toggle=true;
      this.navClass="content-toggle";
    }else{
      this.toggle=false;
      this.navClass="content";
    }
  }*/

  toggleCollapse(){
    //this.collapsed=true;
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

}
