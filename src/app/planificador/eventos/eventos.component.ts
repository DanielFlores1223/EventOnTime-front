import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  sidebarToggle: boolean=false;

  constructor(private eventService: EventService ) { }

  eventos =[{
    id: "62e08bd622c947376ebee1b8",
    name: "Prueba1",
    code: "6212",
    description: "Prueba1",
    dateStart: "2022-07-25T00:00:00.000Z",
    dateFinish: "2022-07-26T00:00:00.000Z",
    googleMaps: "Prueba1",
    dressCode: "Prueba1",
    address: "Prueba1",
    services: [
        "62d710ce828e5e442b3a621d",
        "62d710ce828e5e442b3a621d"
    ],
    type: "Personal",
    status: true,
    planner: "62e08b0722c947376ebee1ab",
    __v: 0,
    pictures: [
        "pic1.png"
    ]
  }];

  total_events=0;
  ngOnInit(): void {
    this.get_events();
  }

  get_events(){
    this.eventService.get_user_events()
      .subscribe(res=>{
        const data = res.result;
        console.log(res);
        this.total_events= data.total;
        this.eventos=data.events;
      },
      err =>{
        console.log(err);
      })
  }

  delete_event(){
    console.log("Deleting...")
  }

  edit_event(){
    console.log("Editing...")
  }

  add_event(){
    console.log("Adding...")
  }

}
