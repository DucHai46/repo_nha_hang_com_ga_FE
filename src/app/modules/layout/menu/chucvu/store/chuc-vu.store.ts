import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface ChucVuState {
    items: any[];
}

export const initialState: ChucVuState = {
    items: [],
}

@Injectable()
export class ChucVuStore extends ComponentStore<ChucVuState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}