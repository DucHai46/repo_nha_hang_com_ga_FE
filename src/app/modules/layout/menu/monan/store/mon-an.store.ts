import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface MonAnState {
    items: any[];
}

export const initialState: MonAnState = {
    items: [],
}

@Injectable()
export class MonAnStore extends ComponentStore<MonAnState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}