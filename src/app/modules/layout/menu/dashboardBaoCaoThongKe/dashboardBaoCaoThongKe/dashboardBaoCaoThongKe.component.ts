import { HoaDonThanhToanService } from './../../hoadonthanhtoan/services/hoadonthanhtoan.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
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
  chartBarDoanhThu = {
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


  constructor(private hoaDonThanhToanService: HoaDonThanhToanService) { }

  ngOnInit(): void {
    this.onThongKeDoanhThu();
  }

  doanhThuType = [
    {
      id: 0,
      name: 'Theo ngày'
    },
    {
      id: 1,
      name: 'Theo tuần'
    },
    {
      id: 2,
      name: 'Theo tháng'
    }
  ]
  doanhThuTypeSelected: any;
  onChangeDoanhThuType(event: any) {
    console.log(event.target.value);
    this.doanhThuTypeSelected = event.target.value;
  }

  formThongKeDoanhthu = {
    doanhThuType: 0,
    tuNgay: new Date(),
    denNgay: new Date(),
    soTuan: 0
  }

  onThongKeDoanhThu() {
    this.hoaDonThanhToanService.getDoanhThu(this.formThongKeDoanhthu).subscribe((res: any) => {
      if (res != null) {
        const categories = res.map((item: any) => item.thoiGian);
        const doanhThu = res.map((item: any) => item.doanhThu);

        this.chartBarDoanhThu = {
          series: [{ name: 'Doanh thu', data: doanhThu }],
          chart: { type: 'bar' as ChartType, height: 300 },
          xaxis: { categories: categories },
          title: { text: 'Biểu đồ doanh thu' },
          dataLabels: { enabled: true }
        };
      }
    });
  }
}
