import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface DonDatBanState {
    items: any[];
}

export const initialState: DonDatBanState = {
    items: [],
}

@Injectable()
export class DonDatBanStore extends ComponentStore<DonDatBanState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}