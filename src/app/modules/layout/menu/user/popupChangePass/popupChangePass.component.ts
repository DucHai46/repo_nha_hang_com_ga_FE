import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateUser, User } from '../../../../../models/User';

@Component({
  selector: 'app-popupChangePass',
  templateUrl: './popupChangePass.component.html',
  styleUrls: ['./popupChangePass.component.scss']
})
export class PopupChangePasswordComponent {

  @Input() formData: any = {
    id: '',
    password: ''
  }


  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() { }


  onSave(): void {
    this.save.emit(this.formData);

  }

  onCancel(): void {
    this.close.emit();
  }
}
