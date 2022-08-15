import { Component, OnInit } from '@angular/core';
import { StadisticService } from 'src/app/services/stadistic.service';

@Component({
  selector: 'app-dashboard-prov',
  templateUrl: './dashboard-prov.component.html',
  styleUrls: ['./dashboard-prov.component.scss']
})
export class DashboardProvComponent implements OnInit {

  token = localStorage.getItem('token') ?? '';

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  data: any;

  constructor( private stadisticService: StadisticService ) { }

  ngOnInit(): void {
    this.getDash();
  }

  getDash() {
    this.stadisticService.getDashboarProviderInfo( this.token ).subscribe(
      {
        next: res => {
          this.data = res.result;
        },
        error: err => {

        }
      }
    )
  }

  

  

}
