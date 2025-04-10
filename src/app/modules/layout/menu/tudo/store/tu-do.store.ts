import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface TuDoState {
    items: any[];
}

export const initialState: TuDoState = {
    items: [],
}

@Injectable()
export class TuDoStore extends ComponentStore<TuDoState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}