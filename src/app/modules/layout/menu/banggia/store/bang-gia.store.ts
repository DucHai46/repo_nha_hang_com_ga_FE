import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface BangGiaState {
    items: any[];
}

export const initialState: BangGiaState = {
    items: [],
}

@Injectable()
export class BangGiaStore extends ComponentStore<BangGiaState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}