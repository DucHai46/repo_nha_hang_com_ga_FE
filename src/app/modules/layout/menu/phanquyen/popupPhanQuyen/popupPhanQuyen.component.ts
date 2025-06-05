import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MenuDynamicService } from '../../menudynamic/services/menudynamic.service';
import { MenuDynamic } from '../../../../../models/MenuDynamic';
@Component({
  selector: 'app-popupPhanQuyen',
  templateUrl: './popupPhanQuyen.component.html',
  styleUrls: ['./popupPhanQuyen.component.scss']
})
export class PopupPhanQuyenComponent {
  @Input() formData: any = {
    tenPhanQuyen: '',
    moTa: '',
    danhSachMenu: []
  };
  @Input() isEditMode: boolean = false;
  @Input() isChiTietOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private menuDynamicService: MenuDynamicService
  ) { }
  menuDynamic: MenuDynamic[] = [];
  ngOnInit(): void {
    this.menuDynamicService.getMenuDynamic({ isPaging: false, PageNumber: 1, PageSize: 1000 }).subscribe(
      {
        next: (res: any) => {
          if (res.data) {
            this.menuDynamic = res.data.data
            console.log(this.menuDynamic);
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }

}
