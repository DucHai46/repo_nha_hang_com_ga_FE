import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderSignalRServiceService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + '/orderHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => {
        console.error('SignalR Connection Error:', err);
      });
  }

  public addOrderListener(callback: (message: string) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveOrder', callback);
    }
  }
  public addOrderListener2(callback: (message: string) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveNhacDon', callback);
    }
  }

  public ChangeStatusOrderListener(callback: (message: string) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ChangeStatusOrder', callback);
    }
  }

  public cancelOrderListener(callback: (message: string) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('CancelOrder', callback);
    }
  }

  public confirmOrderListener(callback: (message: string) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ConfirmOrder', callback);
    }
  }
}
