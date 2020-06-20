import { Component, OnInit } from "@angular/core";
import { Label } from "ng2-charts";
import { ChartDataSets } from "chart.js";
import { NorthwindService } from "src/app/services/northwind.service";
import { Observable } from "rxjs";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.scss"],
})
export class BarComponent implements OnInit {
  constructor(private service: NorthwindService, private router: Router) {}

  dataDimension: Label[] = [];
  dataValues: ChartDataSets[] = [];
  year = "[Dim Tiempo].[Anio]";
  month = "[Dim Tiempo].[Mes Abreviado Espaniol]";
  defaultBindingsList = [
    {
      value: 1,
      label: "Cliente",
      dimension: "[Dim Cliente].[Dim Cliente Nombre]",
    },
    {
      value: 2,
      label: "Producto",
      dimension: "[Dim Producto].[Dim Producto Nombre]",
    },
    {
      value: 3,
      label: "Empleado",
      dimension: "[Dim Empleado].[Dim Empleado Nombre]",
    },
  ];

  selectedDimension = null;
  year$: Observable<any>;
  month$: Observable<any>;
  customer$: Observable<any>;
  years: string[] = [];
  datas: string[] = [];

  selectedCustomer: string[] = [];
  selectedYear: string[] = [];
  selectedMonth: string[] = [];

  selectedDataValues = [];

  ngOnInit(): void {
    const decodeUser = jwt_decode(localStorage.getItem("currentUser"));
    if (decodeUser.rol === "BAR" || decodeUser.rol === "Admin") {
      this.selectedDimension = this.defaultBindingsList[0];
      this.customer$ = this.service.getItemsByDimension(
        `${this.selectedDimension.dimension}`,
        "ASC"
      );
      this.year$ = this.service.getItemsByDimension(`${this.year}`, "ASC");
      this.month$ = this.service.getItemsByDimension(`${this.month}`, "ASC");
    } else {
      alert("No tienes permisos para ver gráfico de barras");
      this.router.navigate(["/pie-chart"]);
    }
  }
  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.customer$ = this.service.getItemsByDimension(
      `${this.selectedDimension.dimension}`,
      "ASC"
    );
  }
  onChangeYearValues() {
    this.selectedDataValues = [];
    if (this.selectedYear.length <= 0) {
      console.log("err");
    } else {
      var objYear = {
        Dimension: this.selectedCustomer,
        Year: this.selectedYear,
      };
      this.service
        .getDataYearByDimension(
          this.selectedDimension.dimension,
          this.year,
          "ASC",
          objYear
        )
        .subscribe((result: any) => {
          this.dataDimension = result.anio;
          result.sales.forEach((element) => {
            this.selectedDataValues.push({
              data: element.ventas,
              label: element.name,
            });
          });
          this.dataValues = this.selectedDataValues;
        });
    }
  }
  onChangeMonthValues() {
    this.selectedDataValues = [];
    if (this.selectedYear.length <= 0) {
      console.log("err");
    } else {
      var objYear = {
        Dimension: this.selectedCustomer,
        Year: this.selectedYear,
      };
      this.service
        .getDataYearByDimension(
          this.selectedDimension.dimension,
          this.year,
          "ASC",
          objYear
        )
        .subscribe((result: any) => {
          this.dataDimension = this.selectedMonth;
          result.sales.forEach((element) => {
            this.selectedDataValues.push({
              data: element.ventas,
              label: element.name,
            });
          });
          this.dataValues = this.selectedDataValues;
        });
    }
  }
}
