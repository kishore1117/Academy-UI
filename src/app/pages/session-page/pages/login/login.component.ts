import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SigupBody } from '../../session-models/signup-model';


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
        localStorage.setItem('token', res.token);
        this.credForm.reset();
        this.router.navigate(['academy/dashboard'])
      },
      error:(err:any)=>{
        console.log(err)
        this.credForm.reset();
      }
    })
  }
  onSubmit(): void {
    if (this.credForm.invalid) {
      return;
    }
    this.login();
  }
  redirect(){
    this.router.navigate(['/signup'])
  }

}
