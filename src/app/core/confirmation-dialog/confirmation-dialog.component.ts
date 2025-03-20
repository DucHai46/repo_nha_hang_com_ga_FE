import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  // Hàm xử lý khi nhấn "Xác nhận"
  onConfirm(): void {
    this.dialogRef.close(true); // Trả về true để xác nhận xóa
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(false); // Trả về false để hủy
  }
}
