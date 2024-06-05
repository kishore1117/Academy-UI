import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { JwtPayload, locationResponse } from "../../academy-models/academy.module";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  constructor(
    private userService: UserService
  ) {}
  location: locationResponse[]
  
  ngOnInit() {
    var user = localStorage.getItem("token");
    var result:JwtPayload = jwtDecode(user!);
    this.userService.getUser(result.franchise).subscribe({
      next:(res:any)=>{
        this.location =res.location
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
