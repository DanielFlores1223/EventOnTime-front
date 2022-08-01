import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  sidebarToggle: boolean=false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.sidebarToggle);
  }



}
