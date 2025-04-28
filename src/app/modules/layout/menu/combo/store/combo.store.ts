import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface ComboState {
    items: any[];
}

export const initialState: ComboState = {
    items: [],
}

@Injectable()
export class ComboStore extends ComponentStore<ComboState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}