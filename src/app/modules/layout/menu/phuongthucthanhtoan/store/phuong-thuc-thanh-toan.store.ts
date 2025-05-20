import { PhuongThucThanhToan } from './../../../../../models/PhuongThucThanhToan';
import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhuongThucThanhToanState {
    items: any[];
}

export const initialState: PhuongThucThanhToanState = {
    items: [],
}

@Injectable()
export class PhuongThucThanhToanStore extends ComponentStore<PhuongThucThanhToanState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}