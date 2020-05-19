import { Component, OnInit, Input } from "@angular/core";
import { Label } from "ng2-charts";
import { ChartType, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit {
  
  @Input() pieChartLabels: Label[] = [];
  @Input() pieChartData: number[] = [];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  // public pieChartLabels: Label[];
  // public pieChartData: number[];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)",
        "rgba(196,79,244,0.3)",
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
