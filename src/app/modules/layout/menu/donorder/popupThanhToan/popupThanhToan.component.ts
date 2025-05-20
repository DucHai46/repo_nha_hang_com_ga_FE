import { DonOrderAdminService } from './../services/donorderadmin.service';
import { PhuongThucThanhToanService } from './../../phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { khuyenmaiService } from './../../khuyenmai/services/khuyenmai.service';
import { PhuPhiService } from './../../phuphi/services/phuphi.service';
import { NhaHangService } from './../../nhahang/services/nhahang.service';
import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { ComboService } from '../../combo/services/combo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupThanhToan',
  templateUrl: './popupThanhToan.component.html',
  styleUrl: './popupThanhToan.component.scss'
})
export class PopupThanhToanComponent implements OnInit {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Input() form: any; // Lưu dữ liệu để tạo hóa đơn 
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  @Output() save = new EventEmitter<any>(); // Emit sự kiện khi cập nhật trạng thái
  @Input() isAddMode: boolean = false;

  nhaHangs: any;

  phuPhi: any [] = [] ;

  khuyenMai: any [] = [] ;

  nhanVien: any [] = [] ;

  phuongThucThanhToan: any [] = [] ;

  donOrder: any;
  nhaHangId: any;

  searchNH: any = {
    isPaging: true,
    PageNumber: 1,
    PageSize: 10,
    isActive: true,
    tenNhaHang: 'Cơm gà Singapor',
  }

  
 

  //Hàm xử lý khi nhấn nút lưu
  onSave(): void {

    this.save.emit(this.form);
  }

  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }

  ngOnInit(): void {
    // this.nhaHangService.getNhaHang(this.searchNH).subscribe( {
    //   next: (res: any) => {
    //     this.nhaHang = res.data.data;
    //     this.nhaHangId = this.nhaHang.id;
    //     console.log(this.nhaHang.tenNhaHang);

    //     this.form = {
    //     nhaHangs: this.nhaHangId,
    //   };
    //   console.log(this.form);

    //     console.log(this.nhaHang);
    //     // console.log(this.formData);
    //   }, 
    // });

    this.nhaHangService.getNhaHangById('681e3228ea1dd60c87e771e7').subscribe({
      next: (res: any) => {
        this.nhaHangs = res.data;
        // this.nhaHangItem = this.nhaHangs.find((nh: any) => nh.id === this.formData.nhaHang.id);
        console.log(this.nhaHangs);
        console.log(this.nhaHangs.id);
        this.form = {
          nhaHang: this.nhaHangs.id,
          donOrder: this.formData.id,
          gioVao: this.formData.createdDate,
        };
        // console.log(this.form);
      },
    });

    this.nhanVienService.getNhanVien({}).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhanVien,
        }))
        console.log(this.nhanVien);
        console.log(this.nhanVien[0].id);
      },
    });

    this.phuPhiService.getPhuPhi({}).subscribe({
      next: (res: any) => {
        this.phuPhi = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuPhi,
          giaTri: item.giaTri
        }));
        console.log(this.phuPhi);
      },
    });

    this.khuyenmaiService.getKhuyenMai({}).subscribe({
      next: (res: any) => {
        this.khuyenMai = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenKhuyenMai,
          giaTri: item.giaTri
        }))
        console.log(this.khuyenMai);
      },
    });

    this.phuongThucThanhToanService.getPhuongThucThanhToan({}).subscribe({
      next: (res: any) => {
        this.phuongThucThanhToan = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuongThuc,
        }))
        console.log(this.phuongThucThanhToan);
      },
    });

  //   this.form = {
  //   // nhaHang: this.nhaHangs.id,
  //   donOrder: this.formData.id,
  //   gioVao: this.formData.createdDate,
  // };
  console.log(this.form);

  }

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }

  constructor(
    private fileService: FileService,
    private notification: NzNotificationService,
    private donOrderService: DonOrderAdminService, // Thêm service vào đây
    private nhanVienService: NhanVienService,
    private nhaHangService: NhaHangService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private donOrderAdminService: DonOrderAdminService,
  ) {}
}
