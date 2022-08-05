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

  onToggleSideNav(data: SidebarToggle ):void{
    this.isSideNavCollapsed=data.collapsed;
    this.screenWidth=data.screenWidth;
  }

}
