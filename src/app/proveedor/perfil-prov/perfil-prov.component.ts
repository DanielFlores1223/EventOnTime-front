import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Variant, showAlert } from '../../helpers/show-alerts';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';
import { PictureService } from '../../services/picture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-prov',
  templateUrl: './perfil-prov.component.html',
  styleUrls: ['./perfil-prov.component.scss']
})
export class PerfilProvComponent implements OnInit {

  myProfile: any;
  token: string = localStorage.getItem('token') ?? '';

  accountType: string = localStorage.getItem('account') || '';
  files: File[] = [];
  picureSave: any;
  picture="";
  new_profile: Profile ={
    "name":"",
    "email":"",
    "company":"",
    "workstation": ""
  }

  profile_body: Profile ={
    "name":"",
    "email":""
  }

  constructor(private profile: ProfileService, private spinner: NgxSpinnerService, private pictureService: PictureService,private router: Router) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }


  getProfileInfo(){
    this.spinner.show();
    this.profile.getProfileInfo(this.token).subscribe({
      next:(res:any)=>{
        this.myProfile=res.result;
        this.picture=res.result.pictures[res.result.pictures.length-1].url;
        this.spinner.hide();
      },
      error: err=>{
        showAlert( 'Información incorrecta', Variant.error );
        console.log(err)
      }

    })
  }

  updateProfileInfo(){
    Swal.fire({
      title: '¿Quieres Guardar Cambios?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {this.profile_body.name= this.myProfile.name;
        this.profile_body.email=this.myProfile.email;
        this.profile.updateMyInfo(this.token,this.profile_body).subscribe({
          next: (res:any)=>{
            this.saveImgs(res.result.uid,res.msg);
            this.getProfileInfo()
          },
          error: err=>{
            showAlert( 'Información incorrecta', Variant.error );
            console.log(err);
          }
        })
        Swal.fire('Perfil Actualizado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelando', '', 'info')
        this.getProfileInfo();
      }
    })
  }

  saveImgs( id: string = '', msg = '' ) {
    
    this.pictureService.addImg( 'User', id, this.picureSave ).subscribe(
      {
        next: async (res) => {
          this.spinner.hide();

          await Swal.fire({
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 3000,
            backdrop: `
              rgba(0,0,123,0.4)
              url("../../../assets/Imagenes/confe2.gif")
              left top
              repeat
            `
          });

          this.router.navigate(['/planificador/eventos']);
        },
        error: err => {
            console.log(err)
            this.spinner.hide();
            showAlert( err.error.msg, Variant.error );
        },
      }
    )

  }

  parseImage(event: any){
    if(event.target.files && event.target.files[0]){
      this.picureSave = <File>event.target.files;
      console.log(this.picureSave);
    }
  }

}
