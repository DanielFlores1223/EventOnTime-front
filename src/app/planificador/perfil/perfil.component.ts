import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/Profile';
import { Variant, showAlert } from '../../helpers/show-alerts';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  myProfile: any;
  token: string = localStorage.getItem('token') ?? '';

  accountType: string = localStorage.getItem('account') || '';

  new_profile: Profile ={
    "name":"",
    "email":"",
    "company":"",
    "workstation": "",
  }

  constructor(private profile: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }


  getProfileInfo(){
    this.spinner.show();
    this.profile.getProfileInfo(this.token).subscribe({
      next:(res:any)=>{
        this.myProfile=res.result;
        this.spinner.hide();
        //console.log(res.result);
      },
      error: err=>{
        showAlert( 'Información incorrecta', Variant.error );
        console.log(err)
      }

    })
  }

  updateProfileInfo(){
    this.spinner.show();
    this.new_profile=this.myProfile;
    this.new_profile.name=this.myProfile.name;
    this.new_profile.email=this.myProfile.email;
    this.new_profile.company=this.myProfile.company.company;
    this.new_profile.workstation=this.myProfile.company.workstation;
    console.log(this.new_profile)
    this.profile.updateMyInfo(this.token,this.new_profile).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.getProfileInfo()
        this.spinner.hide();
      },
      error: err=>{
        showAlert( 'Información incorrecta', Variant.error );
        console.log(err);
      }
    })
  }

}
