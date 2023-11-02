import { Component, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

export interface inexpuchartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
  marker: ApexMarkers | any;
}

@Component({
  selector: 'app-bandwidth-usage',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './bandwidth-usage.component.html',
})
export class AppBandwidthUsageComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public inexpuchartOptions!: Partial<inexpuchartOptions> | any;

  constructor() {
    this.inexpuchartOptions = {
      series: [
        {
          name: '',
          data: [5, 0, 12, 1, 8, 3, 12, 15],
        },
      ],
      chart: {
        type: 'line',
        height: 70,
        width: 130,
        offsetY: 5,
        fontFamily: 'IBM Plex Sans,sans-serif',
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: 'rgba(255, 255, 255, 0.5)',
      },
      legend: {
        show: false,
      },
      colors: ['#fff'],
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
