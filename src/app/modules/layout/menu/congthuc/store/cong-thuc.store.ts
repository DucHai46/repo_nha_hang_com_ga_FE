import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface CongThucState {
    items: any[];
}

export const initialState: CongThucState = {
    items: [],
}

@Injectable()
export class CongThucStore extends ComponentStore<CongThucState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}