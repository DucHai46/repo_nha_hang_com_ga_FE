import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface ThucDonState {
    items: any[];
}

export const initialState: ThucDonState = {
    items: [],
}

@Injectable()
export class ThucDonStore extends ComponentStore<ThucDonState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}