import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface CaLamViecState {
    items: any[];
}

export const initialState: CaLamViecState = {
    items: [],
}

@Injectable()
export class CaLamViecStore extends ComponentStore<CaLamViecState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}