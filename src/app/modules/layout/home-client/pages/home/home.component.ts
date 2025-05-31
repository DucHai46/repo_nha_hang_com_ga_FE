import { GiaoDien } from '../../../../../models/GiaoDien';
import { HomeClientStore } from './../../store/home-client.store';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private homeClientStore: HomeClientStore) { }
  giaoDien: GiaoDien | undefined;

  ngOnInit(): void {
    this.homeClientStore.giaoDien$.subscribe((giaoDien) => {
      this.giaoDien = giaoDien;
    });
    console.log(this.giaoDien);
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
    }
  }
}
