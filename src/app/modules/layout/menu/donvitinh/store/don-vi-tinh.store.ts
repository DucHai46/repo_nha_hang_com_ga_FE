import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface DonViTinhState {
    items: any[];
}

export const initialState: DonViTinhState = {
    items: [],
}

@Injectable()
export class DonViTinhStore extends ComponentStore<DonViTinhState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}