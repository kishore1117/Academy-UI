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


  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["session/login"]);
  }
}
