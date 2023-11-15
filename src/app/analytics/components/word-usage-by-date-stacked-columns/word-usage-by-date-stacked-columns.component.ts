import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexXAxis } from 'ng-apexcharts';
import { WordsUsageByDay } from '../../dtos/words-usage-by-day.dot';

@Component({
  selector: 'app-word-usage-by-date-stacked-columns',
  templateUrl: './word-usage-by-date-stacked-columns.component.html',
  styleUrls: ['./word-usage-by-date-stacked-columns.component.scss']
})
export class WordUsageByDateStackedColumnsComponent implements OnInit, OnChanges {

  @Input() data: WordsUsageByDay[];

  chartOptions: Partial<ChartOptions> | any;

  ngOnInit(): void {
    // this.initializeData();
  }

  ngOnChanges() {
    this.initializeData();
}

  initializeData() {
    const gptVersions = Array.from(new Set(this.data.map(item => item.gpt)));
    const days = Array.from(new Set(this.data.map(item => parseInt(item.day as any)))).sort((a, b) => a - b);

    const minDay = 1;
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
          show: false
        },
        zoom: {
          enabled: false
        },
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
        offsetY: 50,
        labels: {
          useSeriesColors: false
        },
        markers: {
          fillColors: ['#127475', '#4285f4']
        }
      },
      fill: {
        opacity: 1,
        colors: ['#127475', '#4285f4']
      },
      dataLabels: {
        enabled: false
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