import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhieuThanhLyState {
    items: any[];
}

export const initialState: PhieuThanhLyState = {
    items: [],
}

@Injectable()
export class PhieuThanhLyStore extends ComponentStore<PhieuThanhLyState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}