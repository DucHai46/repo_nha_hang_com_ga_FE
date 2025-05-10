import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface NhaHangState {
    items: any[];
}

export const initialState: NhaHangState = {
    items: [],
}

@Injectable()
export class NhaHangStore extends ComponentStore<NhaHangState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}