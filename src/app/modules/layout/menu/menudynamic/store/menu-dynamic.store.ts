import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface MenuDynamicState {
    items: any[];
}

export const initialState: MenuDynamicState = {
    items: [],
}

@Injectable()
export class MenuDynamicStore extends ComponentStore<MenuDynamicState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));
    
}