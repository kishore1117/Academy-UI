import { Component, signal } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "../../service/user.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppState } from "src/app/shared/store/app.state";
import { Store } from '@ngrx/store';
import { selectCurrentUser } from "src/app/shared/store/selectors/current-user.selector";
import { loadUser } from "src/app/shared/store/actions/current-user.action";
import { reset } from "src/app/shared/store/actions/counter.action";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  constructor(
    private _location: Location,
    private toastr: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store.select(selectCurrentUser).subscribe((item)=>{
      this.location = item?.location
      this.franchise = item?.franchise
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

  location: any;
  users: any;
  franchise: any;
  checked = false;
  inviteForm: FormGroup;
  role: any[] = [
    { lable: "Admin", value: "admin" },
    { lable: "User", value: "user" }
  ];

  get locations(): FormArray {
    return this.inviteForm.get("locations") as FormArray;
  }

  get franchis(): FormControl {
    return this, this.inviteForm.get("franchise_id") as FormControl;
  }
  readonly panelOpenState = signal(false);
  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      locations: this.fb.array([]),
      franchise_id: [] // Initialize with an empty FormArray
    });
  }
  onCheckboxChange(event: any, location: number) {
    if (event.target.checked) {
      this.locations.push(this.fb.control(location));
      this.franchis.patchValue(this.franchise.id);
    } else {
      const index = this.locations.controls.findIndex(
        control => control.value === location
      );
      this.locations.removeAt(index);
    }
  }

  onSubmit() {
    this.userService.setInvite(this.inviteForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }
    });
    this.inviteForm.reset();
  }
  backClicked() {
    this._location.back();
  }
  ngdestroy(){
    this.store.dispatch(reset())
  }
}
