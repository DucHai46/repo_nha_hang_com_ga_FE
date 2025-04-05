import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface BanAnState {
    items: any[];
}

export const initialState: BanAnState = {
    items: [],
}

@Injectable()
export class BanAnStore extends ComponentStore<BanAnState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}