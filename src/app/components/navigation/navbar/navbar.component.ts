import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";

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
  user = "";

  ngOnInit() {}
  getUser() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.user = jwt_decode(currentUser).email;
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
