import { Component,signal } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "../../service/user.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  constructor(private _location: Location,private toastr: ToastrService,private userService: UserService, private fb: FormBuilder,) {}

  location: any
  users: any
  franchise:any
  checked = false;
  inviteForm:FormGroup;
  role: any[] = [
    { lable: "Admin", value: "admin" },
    { lable: "User", value: "user" }
  ];

  get locations(): FormArray {
    return this.inviteForm.get('locations') as FormArray;
  }

  get franchis(): FormControl {
  return this,this.inviteForm.get('franchise_id') as FormControl
  }
  readonly panelOpenState = signal(false);
  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      locations: this.fb.array([]),
      franchise_id:[] // Initialize with an empty FormArray
    });
    this.userService.getUser().subscribe({
      next:(res:any)=>{
        this.location =res.location
        this.franchise = res.franchise
        this.userService.getFranchiseUser(this.franchise?.id).subscribe({
          next:(res:any)=>{
            this.users = res
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  onCheckboxChange(event: any, location: number) {
    if (event.target.checked) {
      this.locations.push(this.fb.control(location));
      this.franchis.patchValue(this.franchise.id)
    } else {
      const index = this.locations.controls.findIndex(control => control.value === location);
      this.locations.removeAt(index);
    }
  }
  
  onSubmit() {
    console.log(this.inviteForm);
      this.userService.setInvite(this.inviteForm.value).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.message)
        },error:(err:any)=>{
          this.toastr.error(err.error.message)
        }
      })
    this.inviteForm.reset()
  }
  backClicked() {
    this._location.back();
  }
}
