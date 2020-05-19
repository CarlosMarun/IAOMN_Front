import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./common/inicio/inicio.component";
import { PieComponent } from "./common/pie/pie.component";
import { BarComponent } from "./common/bar/bar.component";

const routes: Routes = [
  { path: "pie-chart", component: PieComponent },
  { path: "bar-chart", component: BarComponent },
  { path: "inicio", component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
