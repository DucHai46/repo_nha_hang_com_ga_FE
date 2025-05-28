import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LichLamViecNhanVienState {
    items: any[];
}

export const initialState: LichLamViecNhanVienState = {
    items: [],
}

@Injectable()
export class LichLamViecNhanVienStore extends ComponentStore<LichLamViecNhanVienState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}