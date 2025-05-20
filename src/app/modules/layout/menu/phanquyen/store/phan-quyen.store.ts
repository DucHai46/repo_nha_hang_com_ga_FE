import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhanQuyenState {
    items: any[];
}

export const initialState: PhanQuyenState = {
    items: [],
}

@Injectable()
export class PhanQuyenStore extends ComponentStore<PhanQuyenState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}