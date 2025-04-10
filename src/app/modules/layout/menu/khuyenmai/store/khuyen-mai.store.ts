import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface KhuyenMaiState {
    items: any[];
}

export const initialState: KhuyenMaiState = {
    items: [],
}

@Injectable()
export class KhuyenMaiStore extends ComponentStore<KhuyenMaiState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}