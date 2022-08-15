import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

interface SidebarToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar-planificador',
  templateUrl: './sidebar-planificador.component.html',
  styleUrls: ['./sidebar-planificador.component.scss'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave',[
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform:'rotate(0deg)',offset: '0'}),
            style({transform:'rotate(2turn)',offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarPlanificadorComponent implements OnInit {
  
  @Output() onToggleSideNav: EventEmitter<SidebarToggle> = new EventEmitter();
  @Output() screenWidth = 0;
  @Output() collapsed = true;

  @HostListener('window:resize',['$event'])onResize(event:any){
    this.screenWidth= window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
    }
  }

  accountType='';

  navClass = "content";

  picture = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.accountType = localStorage.getItem('account') || '';
    this.picture= localStorage.getItem('picture') ?? '';
    //console.log(this.collapsed);
    //console.log(this.screenWidth);
  }

  cerrarSesion(){
    localStorage.removeItem('account');
    localStorage.removeItem('picture');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('tempTypeEvent');
    localStorage.removeItem('temp_dataSurvey');
    this.router.navigate(['/hogar']);
    
  }
  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

}
