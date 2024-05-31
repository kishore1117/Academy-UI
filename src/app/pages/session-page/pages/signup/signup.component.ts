import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigupBody } from '../../session-models/signup-model';
import { AuthService } from 'src/app/shared/service/auth.service';

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
   ) {}

   ngOnInit(){
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      phone_number: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
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
            this.router.navigate(['academy/dashboard'])
          },
          error:(err:any)=>{
            console.log(err)
            this.signupForm.reset()
          }
        })
      },
      error:(err:any)=>{
        console.log(err)
        this.signupForm.reset()
      }
    });
   
  }
   onSubmit(){
    if (this.signupForm.invalid) {
      return;
    }
    console.log('Form submitted!', this.signupForm.value);
    this.signup(this.signupForm.value)
   }
  redirect(){
    this.router.navigate(['session/login'])
  }
}
