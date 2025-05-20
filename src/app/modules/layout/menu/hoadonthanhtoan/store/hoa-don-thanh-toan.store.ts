import { HoaDonThanhToan } from './../../../../../models/HoaDonThanhToan';
import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface HoaDonThanhToanState {
    items: any[];
}

export const initialState: HoaDonThanhToanState = {
    items: [],
}

@Injectable()
export class HoaDonThanhToanStore extends ComponentStore<HoaDonThanhToanState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}