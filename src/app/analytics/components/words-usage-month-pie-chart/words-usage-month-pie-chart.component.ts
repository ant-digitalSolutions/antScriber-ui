import { Component, Input, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions } from 'ng-apexcharts';



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-words-usage-month-pie-chart',
  templateUrl: './words-usage-month-pie-chart.component.html',
  styleUrls: ['./words-usage-month-pie-chart.component.scss']
})
export class WordsUsageMonthPieChartComponent implements OnInit {

  chartData: Partial<ChartOptions> | any;

  @Input() consumedWords: number;
  @Input() wordsLimit: number;

  @Input() title: string;


  ngOnInit(): void {
  }

  ngOnChanges() {
    this.initializeChartData();
}

  initializeChartData() {
    const percent = Math.round(this.consumedWords/this.wordsLimit * 100);
    this.chartData = {
      series: [percent],
      chart: {
        height: 150,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60px"
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 5,
              fontSize: "15px"
            },
            total: {
              label: this.wordsLimit,
              show: false
            }
          },
        },
      
      },
  
      labels: [`Used: ${this.consumedWords}`]
    };
  }

  
  public get wordLimitText() : string {
    return this.wordsLimit > 0 ? `${this.wordsLimit / 1000}k` : ' ∞';
  }
  

}
