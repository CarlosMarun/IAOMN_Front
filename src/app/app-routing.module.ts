import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./common/inicio/inicio.component";
import { PieComponent } from "./common/pie/pie.component";
import { BarComponent } from "./common/bar/bar.component";
import { LoginComponent } from "./common/login/login/login.component";
import { RegisterComponent } from "./common/register/register/register.component";
import { UsersComponent } from "./common/users/users/users.component";
import { AuthGuard } from "./_helpers/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "pie-chart", component: PieComponent, canActivate: [AuthGuard] },
  { path: "bar-chart", component: BarComponent, canActivate: [AuthGuard] },
  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
