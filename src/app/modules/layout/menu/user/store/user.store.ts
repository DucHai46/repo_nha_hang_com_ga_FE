import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface UserState {
    items: any[];
}

export const initialState: UserState = {
    items: [],
}

@Injectable()
export class UserStore extends ComponentStore<UserState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

}