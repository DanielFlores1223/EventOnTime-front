import { Component,Input, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { StadisticService } from '../../services/stadistic.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  surveys: any = [];
  token: string = localStorage.getItem('token') ?? '';
  saleData = [];
  daysOff = 0;
  eventsPerMonth = 0;

  constructor( private surveyService: SurveyService, 
               private router: Router,
               private stadisticService: StadisticService ) { }

  ngOnInit(): void {
    this.getSurveys();
    this.getDashInfo();
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

  getSurveys() {

    this.surveyService.getPendingSurveys( this.token ).subscribe(
      {
        next: res => {
          this.surveys = res.result;
        },
        error: err => {}
      }
    );

  }

  getDataSelected( serv: any ) {
    localStorage.setItem( 'temp_dataSurvey', JSON.stringify( serv ) );

    //OPENING A NEW WINDOW 
    const url = this.router.serializeUrl( this.router.createUrlTree(['/encuesta-servicio']) ); 
    window.open(url, '_blank');
  }

  loadSurvaysAgain() {
    const reloadStorage = localStorage.getItem('temp_reload_dashboard');

    if( reloadStorage === 'true' ) {
      this.getSurveys();
      localStorage.removeItem('temp_reload_dashboard')
    }
  }

  getDashInfo() {

    this.stadisticService.getDashboardPlannerInfo( this.token ).subscribe(
      {
        next: res => {
          this.saleData = res.result.pieChart;
          this.eventsPerMonth = res.result.numberEvents;
          this.daysOff = res.result.daysOff;
        },
        error: err => {}
      }
    )

  }

}
