import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface DanhMucMonAnState {
    items: any[];
}

export const initialState: DanhMucMonAnState = {
    items: [],
}

@Injectable()
export class DanhMucMonAnStore extends ComponentStore<DanhMucMonAnState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}