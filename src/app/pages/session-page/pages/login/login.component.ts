import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

var decodeValue:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  credForm: FormGroup
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
   ) {}
   ngOnInit(): void {
    this.credForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login(){
    var loginCres = {
      email: this.credForm.get('email')?.value,
      password:this.credForm.get('password')?.value
    }
    this.authService.login(loginCres).subscribe({
      next:(res:any)=>{
        decodeValue = jwtDecode(res.token)
        localStorage.setItem('token', res.token);
        localStorage.setItem('role',decodeValue.role)
        this.credForm.reset();
        this.toastr.success('Login successfull')
        this.router.navigate(['academy/dashboard'])
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message)
        this.credForm.reset();
      }
    })
  }

  redirect(){
    this.router.navigate(['session/signup'])
  }

}
