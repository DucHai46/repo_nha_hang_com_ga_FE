import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-qr',
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">QR Code - {{ tableName }}</h2>
          <button (click)="onClose()" class="hover:bg-gray-100 p-1">
            <svg class="w-[16px] h-[16px] text-gray-800 dark:text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center">
          <qrcode [qrdata]="qrData" [width]="256" [errorCorrectionLevel]="'M'"></qrcode>
          <button (click)="downloadQR()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  `
})
export class PopupQRComponent {
  @Input() qrData: string = '';
  @Input() tableName: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `QR-${this.tableName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }
} 