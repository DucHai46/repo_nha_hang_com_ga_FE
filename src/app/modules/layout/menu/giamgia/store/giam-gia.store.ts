import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface GiamGiaState {
    items: any[];
}

export const initialState: GiamGiaState = {
    items: [],
}

@Injectable()
export class GiamGiaStore extends ComponentStore<GiamGiaState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}