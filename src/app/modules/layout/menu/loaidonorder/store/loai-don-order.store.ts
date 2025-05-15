import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LoaiDonOrderState {
    items: any[];
}

export const initialState: LoaiDonOrderState = {
    items: [],
}

@Injectable()
export class LoaiDonOrderStore extends ComponentStore<LoaiDonOrderState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}