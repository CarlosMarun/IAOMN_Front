import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { AlertService } from "../../../services/alert/alert.service";
import * as jwt_decode from "jwt-decode";
import { MatTable } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) {}
  columnas: string[] = ["email", "fullName", "rol", "borrar"];
  datos = [];
  @ViewChild("tabla", { static: true }) table: MatTable<any>;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authenticationService
      .getUsers()
      .pipe()
      .subscribe(
        (data: any) => {
          this.datos.push(data.users[0]);
        },
        (error) => {
          this.alertService.error(error.error.msg);
        }
      );
  }

  borrarFila(cod: number) {
    const decodeUser = jwt_decode(localStorage.getItem("currentUser"));
    if (decodeUser.rol === "Admin") {
      if (this.datos[0][cod]._id != decodeUser.uid) {
        if (confirm("Realmente quiere borrarlo?")) {
          this.authenticationService
            .delete(this.datos[0][cod]._id)
            .pipe()
            .subscribe(
              (data: any) => {
                this.table.renderRows();
                this.alertService.success(data.msg, false);
              },
              (error) => {
                this.alertService.error(error.error.msg);
                this.authenticationService.logout();
                this.router.navigate(["/login"]);
              }
            );
        }
      } else {
        this.alertService.error("No te puedes suicidar (?", false);
      }
    } else {
      this.alertService.error(
        "No tienes permisos para eliminar usuarios",
        false
      );
    }
  }
}
