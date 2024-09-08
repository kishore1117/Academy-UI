import { Component, Inject} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "../../service/student.service";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-student-model",
  templateUrl: "./student-model.component.html",
  styleUrls: ["./student-model.component.scss"],
  providers: [DatePipe]
})
export class StudentModelComponent {
  studentForm: FormGroup;
  date:any
  roles: { value: string, label: string }[] = [
    { value: 'Batsman', label: 'Batsman' },
    { value: 'Bowler', label: 'Bowler' },
    { value: 'All-rounder', label: 'All-rounder'}
  ];
  kitBag:{value:boolean,label:string}[]=[
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]

  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:{
      id:number,
      formData:any,
      student_id:number
    },
    public dialog: MatDialogRef<any>,
    private studentService :StudentService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
    this.studentForm = new FormGroup({
      name: new FormControl(""),
      client_unique_id: new FormControl("", [Validators.required]),
      birth_date: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone_number: new FormControl("", [Validators.required]),
      kit_bag: new FormControl(""),
      school: new FormControl(""),
      cricket_role: new FormControl(""),
      student_type: new FormControl(""),
      location_id: new FormControl(this.data.id)
    });
  }
  ngOnInit() {
    if(this.data.formData){
      this.date = this.datePipe.transform(this.data.formData.birth_date, 'yyyy-MM-dd')
      this.data.formData.birth_date = this.date;
    }
    this.studentForm.patchValue(this.data.formData)
  }
  submit() {
    if(this.data.formData){
      this.studentService.updateStudent(this.studentForm.value,this.data.student_id).subscribe({
        next:((res)=>{
          this.studentForm.reset();
          this.toastr.success(res.message);
          this.dialog.close(true);
        }), 
        error:((err)=>{
          this.toastr.error(err.error.message)
          this.studentForm.reset();
        })
      })
    }else{
      this.studentService.addStudents(this.studentForm.value).subscribe({
        next:((res)=>{
          this.studentForm.reset();
          this.toastr.success(res.message)
          this.dialog.close(true);
        }),
        error:((err:any)=>{
          this.toastr.error(err.error.message)
          this.studentForm.reset();
        })
      })
    }
  }
  close() {
    this.dialog.close();
  }
}
