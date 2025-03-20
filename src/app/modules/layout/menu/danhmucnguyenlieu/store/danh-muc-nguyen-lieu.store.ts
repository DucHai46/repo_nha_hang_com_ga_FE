import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface DanhMucNguyenLieuState {
    items: any[];
}

export const initialState: DanhMucNguyenLieuState = {
    items: [],
}

@Injectable()
export class DanhMucNguyenLieuStore extends ComponentStore<DanhMucNguyenLieuState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}