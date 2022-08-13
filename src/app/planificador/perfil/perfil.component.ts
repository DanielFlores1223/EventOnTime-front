import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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

}
