import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Variant, showAlert } from '../../helpers/show-alerts';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil-prov',
  templateUrl: './perfil-prov.component.html',
  styleUrls: ['./perfil-prov.component.scss']
})
export class PerfilProvComponent implements OnInit {

  myProfile: any;
  token: string = localStorage.getItem('token') ?? '';

  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }


  getProfileInfo(){
    this.profile.getProfileInfo(this.token).subscribe({
      next:(res:any)=>{
        this.myProfile=res.result;
        console.log(res.result);
      },
      error: err=>{
        console.log(err)
      }

    })
  }

  /*updateProfileInfo(){
    this.profile.updateMyInfo(this.token,this.myProfile).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.getProfileInfo()
      },
      error: err=>{
        showAlert( 'Información incorrecta', Variant.error );
        console.log(err);
      }
    })
  }*/

  updateProfileInfo(){
    Swal.fire({
      title: '¿Quieres Guardar Cambios?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.profile.updateMyInfo(this.token,this.myProfile).subscribe({
          next: (res:any)=>{
            console.log(res);
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

}
