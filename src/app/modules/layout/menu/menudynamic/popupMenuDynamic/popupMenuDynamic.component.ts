import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuDynamicService } from '../services/menudynamic.service';

interface MenuFormData {
  routeLink: string;
  icon: string;
  label: string;
  isOpen: boolean;
  parent: {
    id: string;
    name: string;
  };
  position: string;
  isActive: boolean;
}

@Component({
  selector: 'app-popupMenuDynamic',
  templateUrl: './popupMenuDynamic.component.html',
  styleUrls: ['./popupMenuDynamic.component.scss']
})
export class PopupMenuDynamicComponent implements OnInit {
  private _formData: MenuFormData = {
    routeLink: '',
    icon: '',
    label: '',
    isOpen: false,
    parent: {
      id: '',
      name: ''
    },
    position: '',
    isActive: true
  };

  @Input() set formData(value: MenuFormData) {
    this._formData = {
      ...this._formData,
      ...value,
      parent: value?.parent || { id: '', name: '' }
    };
  }
  get formData(): MenuFormData {
    return this._formData;
  }

  @Input() isEditMode: boolean = false;
  @Input() isDetailMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  menuDynamic: any[] = [];

  constructor(private menuDynamicService: MenuDynamicService) { }

  ngOnInit(): void {
    this.menuDynamicService.getMenuDynamic({ isPaging: false }).subscribe({
      next: (res: any) => {
        if (res.result == 1) {
          this.menuDynamic = res.data.data;
          this.menuDynamic = this.menuDynamic.filter(menu => menu.parent?.id === null);
        }
      },
      error: (err: any) => {
        console.error('Error fetching menu data:', err);
      }
    });
  }

  onSave(): void {
    const body = {
      ...this.formData,
      parent: this.formData.parent?.id || null,
      position: this.formData.position.toString() || null
    };
    this.save.emit(body);
  }

  onCancel(): void {
    this.close.emit();
  }
}
