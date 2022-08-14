import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/Service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Variant, showAlert } from '../../../helpers/show-alerts';

@Component({
  selector: 'app-serviciosform',
  templateUrl: './serviciosform.component.html',
  styleUrls: ['./serviciosform.component.scss']
})
export class ServiciosformComponent implements OnInit {

  token : string = localStorage.getItem('token') || '';

  new_service : Service={
    "name": "",
    "type": "",
    "description": "",
    "price": "",
    "phone": ""
  }

  edit: boolean = false;

  param_id="";

  constructor(private service: ServiceService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.param_id=params['id'];
      this.service.getServiceByID(params['id']).subscribe(
        res =>{
          const data = res.result;
          this.new_service= data;
          this.edit=true;
          console.log(data);        
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  create_service(){
    Swal.fire({
      title: '¿Desea Crear el Servicio?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.createService(this.token,this.new_service)
          .subscribe(res=>{
            console.log(res);
            this.router.navigate(['/proveedor/servicios']);
          },
          err=>{
            showAlert( 'Información incorrecta', Variant.error );
            console.log(err);
            this.router.navigate(['/proveedor/servicios'])
          })
        Swal.fire('Servicio Creado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelando...', '', 'info');
        this.router.navigate(['/proveedor/servicios'])
      }
    })
  }

  update_User():void{
    Swal.fire({
      title: '¿Desea Actualizar el Servicio?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateService(this.token, this.param_id,this.new_service)
          .subscribe(res=>{
            console.log(res);
            this.router.navigate(['/proveedor/servicios']);
          },
          err=>{
            showAlert( 'Información incorrecta', Variant.error );
            console.log(err);
            this.router.navigate(['/proveedor/servicios'])
          })
        Swal.fire('Servicio Actualizado!', '', 'success')
      } else if (result.isDenied) {
        
        Swal.fire('Cancelando...', '', 'info');
        this.router.navigate(['/proveedor/servicios']);
      }
    })
    
  }
  
}
