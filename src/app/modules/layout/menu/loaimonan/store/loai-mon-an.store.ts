import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LoaiMonAnState {
    items: any[];
}

export const initialState: LoaiMonAnState = {
    items: [],
}

@Injectable()
export class LoaiMonAnStore extends ComponentStore<LoaiMonAnState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}