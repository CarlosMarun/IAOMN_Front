import { Component, OnInit } from "@angular/core";
import { Label } from "ng2-charts";
import { Observable } from "rxjs/internal/Observable";
import { NorthwindService } from "src/app/services/northwind.service";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"],
})
export class PieComponent implements OnInit {
  constructor(private service: NorthwindService, private router: Router) {}
  // Data Variables
  dataDimension: Label[] = [];
  dataValues: number[] = [];
  // Data Ng Select
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
  // Ng-Select Multiple
  year$: Observable<any>;
  month$: Observable<any>;
  customer$: Observable<any>;
  selectedCustomer: string[] = [];
  selectedYear: string[] = [];
  selectedMonth: string[] = [];

  ngOnInit(): void {
    const decodeUser = jwt_decode(localStorage.getItem("currentUser"));
    if (decodeUser.rol === "PIE" || decodeUser.rol === "Admin") {
      this.selectedDimension = this.defaultBindingsList[0];
      this.customer$ = this.service.getItemsByDimension(
        `${this.selectedDimension.dimension}`,
        "ASC"
      );
      this.year$ = this.service.getItemsByDimension(`${this.year}`, "ASC");
      this.month$ = this.service.getItemsByDimension(`${this.month}`, "ASC");
    } else {
      alert("No tienes permisos para ver gráfico de pie");
      this.router.navigate(["/bar-chart"]);
    }
  }

  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.customer$ = this.service.getItemsByDimension(
      `${this.selectedDimension.dimension}`,
      "ASC"
    );
  }

  onChangeValues() {
    this.service
      .getDataByDimension(
        this.selectedDimension.dimension,
        "ASC",
        this.selectedCustomer
      )
      .subscribe((result: any) => {
        this.dataDimension = result.datosDimension;
        this.dataValues = result.datosVenta;
      });
  }
  onChangeYearValues() {
    this.dataDimension = [];
    this.dataValues = [];
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
        result.sales.forEach((element) => {
          this.dataDimension.push(element.name);
          this.dataValues.push(element.total);
        });
      });
  }
  onChangeMonthValues() {
    this.service
      .getDataByDimension(this.month, "ASC", this.selectedMonth)
      .subscribe((result: any) => {
        this.dataDimension = result.datosDimension;
        this.dataValues = result.datosVenta;
      });
  }

  clearModel() {
    this.selectedCustomer = [];
    this.service
      .getDataByDimension(
        this.selectedDimension.dimension,
        "DESC",
        this.selectedCustomer
      )
      .subscribe((result: any) => {
        this.dataDimension = result.datosDimension;
        this.dataValues = result.datosVenta;
      });
  }
}
