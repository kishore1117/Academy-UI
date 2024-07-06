import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { JwtPayload, locationResponse } from "../../academy-models/academy.module";
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService
  ) {}
  location: locationResponse[]
  isLoading: boolean = true;
  
  ngOnInit() {
    var user = localStorage.getItem("token");
    var result:JwtPayload = jwtDecode(user!);
    this.userService.getUser(result.franchise).subscribe({
      next:(res:any)=>{
        this.location =res.location
        this.isLoading=false
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  navigate(id:number){
    this.router.navigate([`academy/location`,id]);
  }
}
