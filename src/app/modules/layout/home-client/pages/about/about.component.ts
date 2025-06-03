import { GiaoDien } from '../../../../../models/GiaoDien';
import { HomeClientStore } from './../../store/home-client.store';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit  {
  constructor(private homeClientStore: HomeClientStore) { }
  giaoDien: GiaoDien | undefined;
  ngOnInit(): void {
    this.homeClientStore.giaoDien$.subscribe((giaoDien) => {
      this.giaoDien = giaoDien;
      console.log(this.giaoDien);
    });
    
    
  }

  ngAfterViewInit(): void {
    if(typeof window !== 'undefined') { 
      // window.scrollTo(0, 0);

    }
  }
}
