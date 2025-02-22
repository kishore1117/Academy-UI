import { Component, OnDestroy } from "@angular/core";
import { locationResponse } from "../../academy-models/academy.module";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentModelComponent } from "../../components/student-model/student-model.component";
import { Location } from "@angular/common";
import { ConfirmationModelComponent } from "src/app/shared/components/confirmation-model/confirmation-model.component";
import { StudentService } from "../../service/student.service";
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subject, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/shared/store/selectors/current-user.selector';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"]
})
export class LocationComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  actions: MenuItem[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private studentService: StudentService,
    public dialog: MatDialog,
    private _location: Location,
    private toastr: ToastrService,
    private observer: BreakpointObserver,
    private store: Store<AppState>,
  ) { 
  }


  location: any;
  students: any;
  isMobile: boolean;
  id: number;
  isLoading: boolean = true;
  user$: any;
  first = 0;
  rows = 10;
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.store.select(selectCurrentUser).subscribe((item) => {
      this.user$ = item
      this.location = this.user$?.location.filter((item: any) => item.id == this.id)[0]
      this.isLoading = false
    });
    this.getLocationStudents();
    this.observer.observe(["(max-width: 800px)"]).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  getSeverity(role: string) {
    switch (role) {
      case 'All-rounder':
        return 'success';  // Green tag
      case 'Bowler':
        return 'danger';   // Red tag
      case 'Batsman':
        return 'warning';  // Yellow tag
      default:
        return 'info';     // Blue tag
    }
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.students ? this.first + this.rows >= this.students.length : true;
  }

  isFirstPage(): boolean {
    return this.students ? this.first === 0 : true;
  }
  backClicked() {
    this._location.back();
  }
  getLocationStudents() {
    this.subscription.add(
      this.userService.getLocationStudents(this.id).subscribe({
        next: (res: any) => {
          this.students = res
          console.log(this.students)
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    )
  }

  addData() {
    const dilogRef = this.dialog.open(StudentModelComponent, { data: { id: this.id } })
    dilogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocationStudents();
        }
      }
    })
  }

  updateData(data: any, id: number) {
    console.log('called')
    const dilogRef = this.dialog.open(StudentModelComponent, {
      data: { id: this.id, formData: data, student_id: id },
    })
    dilogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocationStudents();
        }
      }
    })
  }
  deleteRow(id: any) {
    const dilogRef = this.dialog.open(ConfirmationModelComponent)
    dilogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.subscription.add(
            this.studentService.deleteStudent(id).subscribe({
              next: ((res) => {
                this.toastr.success(res.message)
                this.getLocationStudents();
              }),
              error: ((err: any) => {
                this.toastr.error(err.error.message)
              })
            })
          )
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
