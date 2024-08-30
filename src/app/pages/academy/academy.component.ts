import { Component } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { UserService } from "./service/user.service";



@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent {
  isLoggedIn: boolean = true;
  isMobile: boolean;
  role: any;
  token:any;


  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.role = localStorage.getItem('role')
    this.observer.observe(["(max-width: 800px)"]).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  

  logout() {
    localStorage.clear()
    this.router.navigate(["session/login"]);
  }
}
