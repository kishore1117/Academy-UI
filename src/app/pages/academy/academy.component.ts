import { Component, ElementRef, ViewChild } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { loadUser } from 'src/app/shared/store/actions/current-user.action';
import { MatSidenav } from "@angular/material/sidenav";



@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent {
  @ViewChild('Sidenav') public sidenav: MatSidenav;
  isLoggedIn: boolean = true;
  isMobile: boolean;
  role: any;
  token:any;


  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>,
  ) {}
  ngOnInit() {
    this.store.dispatch(loadUser())
    this.role = localStorage.getItem('role')
    this.observer.observe(["(max-width: 800px)"]).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
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
}
