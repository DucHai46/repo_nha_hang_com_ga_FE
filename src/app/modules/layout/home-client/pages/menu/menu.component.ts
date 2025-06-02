import { Component, OnInit } from '@angular/core';
import { ThucDonService } from '../../../menu/thucdon/services/thucdon.service';
import { ThucDon } from '../../../../../models/ThucDon';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  constructor(private thucDonService: ThucDonService) { }

  thucDon: ThucDon | null = null;
  params = {
    IsPaging: false,
    trangThai: 1,
  }

  ngOnInit(): void {
    this.thucDonService.getThucDon(this.params).subscribe({
      next: (res: any) => {
        if(res.result) {
          this.thucDon = res.data.data;
        }
        else {
          this.thucDon = null;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
