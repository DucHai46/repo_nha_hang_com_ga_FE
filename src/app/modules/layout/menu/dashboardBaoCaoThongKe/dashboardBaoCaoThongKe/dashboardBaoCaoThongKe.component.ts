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


  chartLineDoanhThu = {
    series: [{ name: 'Doanh số', data: [44, 55, 41, 67, 22, 43] }],
    chart: { type: 'line' as ChartType, height: 500 },
    title: { text: 'Doanh thu' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    dataLabels: { enabled: false }
  };
  doanhThuTypeSelected: any;
  onChangeDoanhThuType(event: any) {
    this.doanhThuTypeSelected = event.target.value;
  }
  formThongKeDoanhthu = {
    doanhThuType: 0,
    tuNgay: new Date(new Date().setDate(new Date().getDate() - 7)),
    denNgay: new Date(),
    soTuan: 0
  }
  onThongKeDoanhThu() {
    this.hoaDonThanhToanService.getDoanhThu(this.formThongKeDoanhthu).subscribe((res: any) => {
      if (res != null) {
        const categories = res.map((item: any) => item.thoiGian);
        const doanhThu = res.map((item: any) => item.doanhThu);

        this.chartLineDoanhThu = {
          series: [{ name: 'Doanh thu', data: doanhThu }],
          chart: { type: 'line' as ChartType, height: 500 },
          xaxis: { categories: categories },
          title: { text: 'Doanh thu' },
          dataLabels: { enabled: true }
        };
      }
    });
  }

  chartBarBestSellingMonAn = {
    series: [{ name: 'Món ăn bán chạy nhất', data: [30, 40, 35, 50, 49, 60] }],
    chart: { type: 'bar' as ChartType, height: 300 },
    title: { text: 'Món ăn bán chạy nhất' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    dataLabels: { enabled: false }
  };
  bestSellingMonAnTypeSelected: any;
  onChangeBestSellingMonAnType(event: any) {
    this.bestSellingMonAnTypeSelected = event.target.value;
  }
  formBestSellingMonAn = {
    doanhThuType: 0,
    tuNgay: new Date(new Date().setDate(new Date().getDate() - 7)),
    denNgay: new Date(),
    soTuan: 0
  }
  onThongKeBestSellingMonAn() {
    this.hoaDonThanhToanService.getBestSellingMonAn(this.formBestSellingMonAn).subscribe((res: any) => {
      if (res != null) {
        const categories = res.map((item: any) => item.monAn);
        const soLuong = res.map((item: any) => item.soLuong);

        this.chartBarBestSellingMonAn = {
          series: [{ name: 'Món ăn bán chạy nhất', data: soLuong }],
          chart: { type: 'bar' as ChartType, height: 300 },
          title: { text: 'Món ăn bán chạy nhất' },
          xaxis: { categories: categories },
          dataLabels: { enabled: false }
        };
      }
    });
  }


  chartAreaMatDoKhachHang = {
    series: [{ name: 'Số lượng', data: [10, 41, 35, 51, 49, 62] }],
    chart: { type: 'area' as ChartType, height: 300 },
    title: { text: 'Mật độ khách hàng' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    dataLabels: { enabled: false }
  };
  matDoKhachHangTypeSelected: any;
  onChangeMatDoKhachHangType(event: any) {
    this.matDoKhachHangTypeSelected = event.target.value;
  }
  formMatDoKhachHang = {
    doanhThuType: 0,
    tuNgay: new Date(new Date().setDate(new Date().getDate() - 7)),
    denNgay: new Date(),
    soTuan: 0
  }
  onThongKeMatDoKhachHang() {
    this.hoaDonThanhToanService.getMatDoKhachHang(this.formMatDoKhachHang).subscribe((res: any) => {
      if (res != null) {
        const categories = res.map((item: any) => item.thoiGian);
        const soLuong = res.map((item: any) => item.matDoKhachHang);

        this.chartAreaMatDoKhachHang = {
          series: [{ name: 'Số lượng', data: soLuong }],
          chart: { type: 'area' as ChartType, height: 300 },
          title: { text: 'Mật độ khách hàng' },
          xaxis: { categories: categories },
          dataLabels: { enabled: false }
        };
      }
    });
  }

  chartLineKhoanChi = {
    series: [{ name: 'Khoản chi', data: [44, 55, 41, 67, 22, 43] }],
    chart: { type: 'line' as ChartType, height: 500 },
    title: { text: 'Khoản chi' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    dataLabels: { enabled: false }
  };
  khoanChiTypeSelected: any;
  onChangeKhoanChiType(event: any) {
    this.khoanChiTypeSelected = event.target.value;
  }
  formThongKeKhoanChi = {
    doanhThuType: 0,
    tuNgay: new Date(new Date().setDate(new Date().getDate() - 7)),
    denNgay: new Date(),
    soTuan: 0
  }
  onThongKeKhoanChi() {
    this.hoaDonThanhToanService.getKhoanChi(this.formThongKeKhoanChi).subscribe((res: any) => {
      if (res != null) {
        const categories = res.map((item: any) => item.thoiGian);
        const khoanChi = res.map((item: any) => item.khoanChi);

        this.chartLineKhoanChi = {
          series: [{ name: 'Khoản chi', data: khoanChi }],
          chart: { type: 'line' as ChartType, height: 500 },
          xaxis: { categories: categories },
          title: { text: 'Khoản chi' },
          dataLabels: { enabled: true }
        };
      }
    });
  }


  constructor(private hoaDonThanhToanService: HoaDonThanhToanService) { }

  ngOnInit(): void {
    this.onThongKeDoanhThu();
    this.onThongKeBestSellingMonAn();
    this.onThongKeMatDoKhachHang();
    this.onThongKeKhoanChi();
  }



}
