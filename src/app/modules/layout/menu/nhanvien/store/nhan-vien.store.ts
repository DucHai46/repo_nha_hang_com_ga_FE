import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface NhanVienState {
    items: any[];
}

export const initialState: NhanVienState = {
    items: [],
}

@Injectable()
export class NhanVienStore extends ComponentStore<NhanVienState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}