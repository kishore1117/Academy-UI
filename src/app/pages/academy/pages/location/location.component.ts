import { ChangeDetectorRef, Component } from "@angular/core";
import { locationResponse } from "../../academy-models/academy.module";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentModelComponent } from "../../components/student-model/student-model.component";
import { Location } from "@angular/common";
import { ConfirmationModelComponent } from "src/app/shared/components/confirmation-model/confirmation-model.component";
import { StudentService } from "../../service/student.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"]
})
export class LocationComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private studentService :StudentService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private _location: Location,
    private toastr: ToastrService,
  ) {}
  location: locationResponse;
  student:any;
  id: number;
  displayedColumns: string[] = ['No', 'Name', 'Number', 'Email','role','school','student type','action'];
  isLoading: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.getLocation();
    this.getLocationStudents();
    // setTimeout(() => {
    //   this.isLoading = false; // once component is ready, hide the loader
    // }, 1000); 
  }
  backClicked() {
    this._location.back();
  }
  getLocation(){
    this.userService.getLocationById(this.id).subscribe({
      next: (res: any) => {
        this.location = res;
        this.isLoading=false
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading=false
      }
    });
  }
  getLocationStudents(){
    this.userService.getLocationStudents(this.id).subscribe({
      next:(res:any)=>{
        this.student = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addData(){
    const dilogRef =  this.dialog.open(StudentModelComponent,{
      data:{id:this.id},  
      width:'520px',
      maxWidth: '100vw',
      maxHeight: '100vh',
    })
    dilogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getLocationStudents();
        }
      }
    })
  }

  updateData(data:any,id:number){
    const dilogRef = this.dialog.open(StudentModelComponent,{
      data:{id:this.id,formData:data,student_id:id}
    })
    dilogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getLocationStudents();
        }
      }
    })   
  }
  deleteRow(id:any){
    const dilogRef =  this.dialog.open(ConfirmationModelComponent)
    dilogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.studentService.deleteStudent(id).subscribe({
            next:((res)=>{
              this.toastr.success(res.message)
              this.getLocationStudents();
            }),
            error:((err:any)=>{
              this.toastr.error(err.error.message)
            })
          })
        }
      }
    })
  }
}
