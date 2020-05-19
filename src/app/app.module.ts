import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ChartsModule } from "ng2-charts";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "./components/navigation/navbar/navbar.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";
import { InicioComponent } from "./common/inicio/inicio.component";
import { PieComponent } from "./common/pie/pie.component";
import { BarComponent } from "./common/bar/bar.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarChartComponent,
    PieChartComponent,
    InicioComponent,
    PieComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
