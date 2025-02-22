import { Component, ElementRef, ViewChild } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { loadUser } from 'src/app/shared/store/actions/current-user.action';
import { MatSidenav } from "@angular/material/sidenav";
import { sideNavData} from "./sidenav-data/sidenav-data";
import { selectCurrentUser } from 'src/app/shared/store/selectors/current-user.selector';
import { filter, Subject, Subscription } from 'rxjs';
import { roleService } from "./service/role.service";


@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent {
  private subscription: Subscription = new Subscription();
  @ViewChild('Sidenav') public sidenav: MatSidenav;
  isLoggedIn: boolean = true;
  isMobile: boolean;
  sidenavItems:any[]=[];
  role: any;
  token:any;
  user$:any


  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>,
    private roleSvc:roleService
  ) {}
  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((item)=>{
      this.user$ = item
    }); 
    this.role = localStorage.getItem('role')
     this.sidenavItems = sideNavData.data.filter(item => item.role.includes(this.role));
    this.store.dispatch(loadUser())
 
    this.subscription.add(
      this.observer.observe(["(max-width: 800px)"]).subscribe(screenSize => {
        if (screenSize.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      })
    )
  }
  close(){
    if(this.isMobile){
      this.sidenav.toggle()
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["session/login"]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
