import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhieuNhapState {
    items: any[];
}

export const initialState: PhieuNhapState = {
    items: [],
}

@Injectable()
export class PhieuNhapStore extends ComponentStore<PhieuNhapState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}