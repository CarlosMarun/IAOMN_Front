import { Component } from "@angular/core";
import { AuthenticationService } from "./services/auth/authentication.service";
import { User } from "./_models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "front";
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
}
