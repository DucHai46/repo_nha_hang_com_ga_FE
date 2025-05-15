import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface NhaCungCapState {
    items: any[];
}

export const initialState: NhaCungCapState = {
    items: [],
}

@Injectable()
export class NhaCungCapStore extends ComponentStore<NhaCungCapState> {

    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}