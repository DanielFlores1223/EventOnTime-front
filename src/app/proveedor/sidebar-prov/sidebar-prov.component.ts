import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-prov',
  templateUrl: './sidebar-prov.component.html',
  styleUrls: ['./sidebar-prov.component.scss']
})
export class SidebarProvComponent implements OnInit {

  toggle : boolean = false;
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

  toggleSideBar(){
    if(this.toggle==false){
      this.toggle=true;
      this.navClass="content-toggle";
    }else{
      this.toggle=false;
      this.navClass="content";
    }
  }

}
