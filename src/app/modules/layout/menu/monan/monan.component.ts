import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MonAnStore } from './store/mon-an.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { MonAnService } from './services/monan.service';
import { LoaimonanService } from '../loaimonan/services/loaimonan.service';
import { LoaiMonAn } from '../../../../models/LoaiMonAn';
import {GiamGia} from '../../../../models/GiamGia';
import { giamgiaService } from '../giamgia/services/giamgia.service';
import { DonViTinh } from '../../../../models/DonViTinh';
import { DonViTinhService } from '../donvitinh/services/donvitinh.service';
import { TrangThaiNguyenLieu } from '../../../../models/TrangThaiNguyenLieu';

@Component({
  selector: 'app-monan',
  templateUrl: './monan.component.html',
  styleUrl: './monan.component.scss'
})
export class MonanComponent {

}
