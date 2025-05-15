import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface KhachHangState {
    items: any[];
}

export const initialState: KhachHangState = {
    items: [],
}

@Injectable()
export class KhachHangStore extends ComponentStore<KhachHangState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}