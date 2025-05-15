import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface DonOrderState {
    items: any[];
}

export const initialState: DonOrderState = {
    items: [],
}

@Injectable()
export class DonOrderStore extends ComponentStore<DonOrderState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}