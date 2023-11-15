import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexXAxis } from 'ng-apexcharts';
import { WordsUsageByDay } from '../../dtos/words-usage-by-day.dot';

@Component({
  selector: 'app-word-usage-by-date-stacked-columns',
  templateUrl: './word-usage-by-date-stacked-columns.component.html',
  styleUrls: ['./word-usage-by-date-stacked-columns.component.scss']
})
export class WordUsageByDateStackedColumnsComponent implements OnInit {

  @Input() data: WordsUsageByDay[];

  chartOptions: Partial<ChartOptions> | any;

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    const gptVersions = Array.from(new Set(this.data.map(item => item.gpt)));
    const days = Array.from(new Set(this.data.map(item => parseInt(item.day as any)))).sort((a, b) => a - b);

    const minDay = Math.min(...days);
    const maxDay = Math.max(...days);
    const allDays = Array.from({ length: maxDay - minDay + 1 }, (_, i) => (i + minDay).toString());

    const series = gptVersions.map(version => ({
      name: version,
      data: allDays.map(day => {
        const entry = this.data.find(item => +item.day === +day && item.gpt === version);
        return entry ? parseInt(entry.words as any) : 0;
      })
    }));

    this.chartOptions = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: allDays,
      },
      legend: {
        position: 'right',
        offsetY: 50
      },
      fill: {
        opacity: 1
      }
    };
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};