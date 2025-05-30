import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { GiaoDien } from "../../../../models/GiaoDien";

export interface HomeClientState {
    items: any[];
    giaoDien?: GiaoDien;
}

export const initialState: HomeClientState = {
    items: [],
    giaoDien: undefined,
}

@Injectable()
export class HomeClientStore extends ComponentStore<HomeClientState> {
    constructor() {
        super(initialState);
    }

    readonly items$ = this.select((state) => state.items);

    readonly setItems$ = this.updater((state, items: any[]) => ({
        ...state,
        items,
    }));

    readonly setGiaoDien = this.updater((state, giaoDien: GiaoDien) => ({
        ...state,
        giaoDien,
    }));

    readonly giaoDien$ = this.select((state) => state.giaoDien);
}