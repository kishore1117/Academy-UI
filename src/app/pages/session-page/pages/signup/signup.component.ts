import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SigupBody } from '../../session-models/signup-model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

var decodeValue:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email:string | null
  franchise_id:string | null;
  locations:any
  role:string |null
 

  signupForm:FormGroup
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
   ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('',[Validators.required,Validators.minLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      franchise_id: new FormControl(''),
      role: new FormControl(''),
      locations: new FormControl([])
    })
   }


   ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      this.franchise_id =  params.get('franchise_id');
      this.role =  params.get('role');
      this.locations = params.getAll('locations');
    });
    const splitLoc = this.locations[0].split(',')
    this.signupForm.patchValue({
      email: this.email,
      franchise_id: this.franchise_id,
      locations: splitLoc,
      role: this.role 
    })
    console.log(this.signupForm.value)
   }

   signup(credentials:SigupBody){
    this.authService.signup(credentials).subscribe({
      next:(res:any)=>{
        var loginCres = {
          name: this.signupForm.get('name')?.value,
          phone_number: this.signupForm.get('phone_number')?.value,
          email: this.signupForm.get('email')?.value,
          password: this.signupForm.get('password')?.value,
          franchise_id: this.signupForm.get('franchise_id')?.value,
          locations: this.signupForm.get('locations')?.value 
        }
        this.authService.login(loginCres).subscribe({
          next:(res:any)=>{
            localStorage.setItem('token', res.token);
            decodeValue = jwtDecode(res.token)
            localStorage.setItem('role',decodeValue.role)
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
