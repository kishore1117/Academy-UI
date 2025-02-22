import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Location } from "@angular/common";
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from "ngx-toastr";
import { UserService } from 'src/app/pages/academy/service/user.service';
import { AppState } from 'src/app/shared/store/app.state';
import { selectCurrentUser } from 'src/app/shared/store/selectors/current-user.selector';



@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnDestroy, OnInit {
     private subscription: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private _location: Location,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef
  ) {}

    location: any;
    users: any;
    franchise: any;
    inviteForm: FormGroup;
    role: any[] = [
      { lable: "Admin", value: "admin" },
      { lable: "User", value: "user" }
    ];
    checkBoxOptions:any = [];
    selectedValues: string[] = [];

    get locations(): FormArray {
      return this.inviteForm.get("locations") as FormArray;
    }
    get franchis(): FormControl {
      return this, this.inviteForm.get("franchise_id") as FormControl;
    }
    isChecked(itemId: number): boolean {
      return this.locations.value.includes(itemId);
    }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((item)=>{
      this.location = item?.location
      this.franchise = item?.franchise
      this.checkBoxOptions = this.location
      this.intializeForm(); 
    });  
    this.userService.getFranchiseUser(this.franchise?.id).subscribe({
      next:(res:any)=>{
        this.users = res
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  } 

  intializeForm():void{
   this.inviteForm =  this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      locations: this.fb.array([],Validators.required),
      franchise_id: []
   })
  }

  onCheckboxChange(event: any, location: number) {
    if (event.checked.includes(location)) {
      if(!this.locations.value.includes(location)){
      this.locations.push(this.fb.control(location));
      this.franchis.patchValue(this.franchise.id);
      }
    } else {
      const index = this.locations.value.indexOf(location);
      if(index !== -1){
        this.locations.removeAt(index);
      }
    }
  }
  onSubmit() {
    
    this.selectedValues = [];
    this.locations.controls.forEach((control, index) => {
      if (control.value) {
        this.selectedValues.push(this.location[index].value);  // Push selected checkbox values
      }
    });
    
    this.subscription.add(
      this.userService.setInvite(this.inviteForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          // this.resetForm(); 
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
         
        }
      })
    )
    this.resetForm();
    this.cd.detectChanges();
    this.ngOnInit();
  }

  resetForm() {
    this.inviteForm.reset();
    const locationcheckbx = this.inviteForm.get("locations") as FormArray;
    locationcheckbx.controls.forEach((control) => { control.setValue(false); });
  }


  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
