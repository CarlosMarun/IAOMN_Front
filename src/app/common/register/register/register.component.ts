import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AlertService } from "../../../services/alert/alert.service";
import { AuthenticationService } from "../../../services/auth/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      fullName: ["", Validators.required],
      urlPhoto: [""],
      rol: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success(data.msg, true);
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        (error) => {
          this.alertService.error(error.error.msg);
          this.loading = false;
        }
      );
  }
}
