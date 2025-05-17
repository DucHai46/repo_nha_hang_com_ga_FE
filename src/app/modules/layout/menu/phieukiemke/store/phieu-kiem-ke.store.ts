import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhieuKiemKeState {
    items: any[];
}

export const initialState: PhieuKiemKeState = {
    items: [],
}

@Injectable()
export class PhieuKiemKeStore extends ComponentStore<PhieuKiemKeState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}