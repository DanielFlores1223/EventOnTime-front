import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/Survey';
import { SurveyService } from '../../services/survey.service';
import { Variant, showAlert } from 'src/app/helpers/show-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-entrevista-servicio',
  templateUrl: './entrevista-servicio.component.html',
  styleUrls: ['./entrevista-servicio.component.scss']
})
export class EntrevistaServicioComponent implements OnInit {

  infoSurvey: any;
  answers: Array<boolean> = [];
  formFields: any = {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    comments: '',
  }
  token = localStorage.getItem('token') ?? '';

  constructor( private surveyService: SurveyService, ) { }

  ngOnInit(): void {
    this.getInfoSurvey();
  }

  getInfoSurvey() {
    const data = localStorage.getItem('temp_dataSurvey') ?? '';

    if ( data === '' ) 
      return

    this.infoSurvey = JSON.parse( data );

    const d1 = new Date( this.infoSurvey.event.dateStart );
    const d2 = new Date( this.infoSurvey.event.dateFinish );

    this.infoSurvey.event.dateStart = `${d1.toLocaleDateString()} - ${d1.toLocaleTimeString().substring(0, 5)}`;
    this.infoSurvey.event.dateFinish = `${d2.toLocaleDateString()} -${d2.toLocaleTimeString().substring(0, 5)}`;
  }

  saveSurvey() {
    console.log(this.formFields)

    for (const key in this.formFields) {

      if( key === 'comments' )
        continue;

      this.answers = [ ...this.answers, this.formFields[key] ]  
    }

    this.surveyService.answerSurvey( this.token, this.infoSurvey._id, { answers: this.answers, comments: this.formFields.comments } ).subscribe(
      {
        next: async (res) => {
          await Swal.fire({
            icon: 'success',
            title: res.msg,
            showConfirmButton: false,
            timer: 2500,
          });

          window.location.reload();
          window.close();
          localStorage.setItem( 'temp_reload_dashboard', 'true' );
        },
        error: err => {
          showAlert( err.error.msg, Variant.error );
        }
      }
    )

  }

}
