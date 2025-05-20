import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface PhuPhiState {
    items: any[];
}

export const initialState: PhuPhiState = {
    items: [],
}

@Injectable()
export class PhuPhiStore extends ComponentStore<PhuPhiState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}