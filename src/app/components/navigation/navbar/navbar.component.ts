import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}
  getUser() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
