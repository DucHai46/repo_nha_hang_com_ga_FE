import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LoaiNguyenLieuState {
    items: any[];
}

export const initialState: LoaiNguyenLieuState = {
    items: [],
}

@Injectable()
export class LoaiNguyenLieuStore extends ComponentStore<LoaiNguyenLieuState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}