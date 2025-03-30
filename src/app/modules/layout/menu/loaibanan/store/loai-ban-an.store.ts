import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LoaiBanAnState {
    items: any[];
}

export const initialState: LoaiBanAnState = {
    items: [],
}

@Injectable()
export class LoaiBanAnStore extends ComponentStore<LoaiBanAnState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}