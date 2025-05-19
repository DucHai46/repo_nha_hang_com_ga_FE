import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhieuXuatState {
    items: any[];
}

export const initialState: PhieuXuatState = {
    items: [],
}

@Injectable()
export class PhieuXuatStore extends ComponentStore<PhieuXuatState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}