import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-planificador',
  templateUrl: './sidebar-planificador.component.html',
  styleUrls: ['./sidebar-planificador.component.scss']
})
export class SidebarPlanificadorComponent implements OnInit {

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

}
