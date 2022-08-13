import { Component } from '@angular/core';

interface SidebarToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventOnTime-front';

  isSideNavCollapsed = false;
  screenWidth = 0;
  logged = false;

  constructor() { 
  }

  ngOnInit(): void {
    this.loadComponent();
    
  }


  onToggleSideNav(data: SidebarToggle ):void{
    this.isSideNavCollapsed=data.collapsed;
    this.screenWidth=data.screenWidth;
  }

  loadComponent(){
    this.logged= this.islogged();
  }

  islogged(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }

  }

}
