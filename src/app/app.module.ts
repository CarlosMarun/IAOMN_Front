import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ChartsModule } from "ng2-charts";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "./components/navigation/navbar/navbar.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";
import { InicioComponent } from "./common/inicio/inicio.component";
import { PieComponent } from "./common/pie/pie.component";
import { BarComponent } from "./common/bar/bar.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./common/login/login/login.component";
import { AlertComponent } from "./common/alert/alert/alert.component";
import { RegisterComponent } from "./common/register/register/register.component";
import { UsersComponent } from "./common/users/users/users.component";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarChartComponent,
    PieChartComponent,
    InicioComponent,
    PieComponent,
    BarComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
