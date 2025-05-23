import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ChartType
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-bao-cao-thong-ke',
  templateUrl: './dashboardBaoCaoThongKe.component.html',
  styleUrls: ['./dashboardBaoCaoThongKe.component.scss']
})
export class DashboardBaoCaoThongKeComponent implements OnInit {
  chartBar = {
    series: [{ name: 'Doanh số', data: [44, 55, 41, 67, 22, 43] }],
    chart: { type: 'bar' as ChartType, height: 500 },
    title: { text: 'Biểu đồ Cột' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    dataLabels: { enabled: false }
  };

  chartLine = {
    series: [{ name: 'Doanh thu', data: [30, 40, 35, 50, 49, 60] }],
    chart: { type: 'line' as ChartType, height: 300 },
    title: { text: 'Biểu đồ Đường' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    dataLabels: { enabled: false }
  };

  chartDonut = {
    series: [44, 55, 13, 43],
    chart: { type: 'donut' as ChartType, height: 500 },
    labels: ['A', 'B', 'C', 'D'],
    title: { text: 'Biểu đồ Donut' },
    dataLabels: { enabled: true }
  };

  chartArea = {
    series: [{ name: 'Lượt truy cập', data: [10, 41, 35, 51, 49, 62] }],
    chart: { type: 'area' as ChartType, height: 300 },
    title: { text: 'Biểu đồ Diện tích' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    dataLabels: { enabled: false }
  };


  constructor() { }

  ngOnInit(): void {
  }
}
