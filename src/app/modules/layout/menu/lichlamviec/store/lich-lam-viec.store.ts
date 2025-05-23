import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LichLamViecState {
    items: any[];
}

export const initialState: LichLamViecState = {
    items: [],
}

@Injectable()
export class LichLamViecStore extends ComponentStore<LichLamViecState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}