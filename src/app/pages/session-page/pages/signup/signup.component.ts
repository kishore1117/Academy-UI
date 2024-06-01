import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigupBody } from '../../session-models/signup-model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm:FormGroup
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
   ) {}

   ngOnInit(){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('',[Validators.required,Validators.minLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
   }

   signup(credentials:SigupBody){
    this.authService.signup(credentials).subscribe({
      next:(res:any)=>{
        var loginCres = {
          email: this.signupForm.get('email')?.value,
          password:this.signupForm.get('password')?.value
        }
        this.authService.login(loginCres).subscribe({
          next:(res:any)=>{
            localStorage.setItem('token', res.token);
            this.signupForm.reset();
            this.toastr.success('Signup successfull')
            this.router.navigate(['academy/dashboard'])
          },
          error:(err:any)=>{
            this.toastr.error(err.error.message)
            this.signupForm.reset()
          }
        })
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message)
        this.signupForm.reset()
      }
    });
   
  }
   onSubmit(){
    if (this.signupForm.invalid) {
    }else{
      this.signup(this.signupForm.value)
    }    
   }
  redirect(){
    this.router.navigate(['session/login'])
  }
}
