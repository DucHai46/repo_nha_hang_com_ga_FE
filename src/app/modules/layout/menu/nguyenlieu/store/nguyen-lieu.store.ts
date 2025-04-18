import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface NguyenLieuState {
    items: any[];
}

export const initialState: NguyenLieuState = {
    items: [],
}

@Injectable()
export class NguyenLieuStore extends ComponentStore<NguyenLieuState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}