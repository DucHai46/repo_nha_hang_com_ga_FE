import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface LoaiTuDoState {
    items: any[];
}

export const initialState: LoaiTuDoState = {
    items: [],
}

@Injectable()
export class LoaiTuDoStore extends ComponentStore<LoaiTuDoState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}