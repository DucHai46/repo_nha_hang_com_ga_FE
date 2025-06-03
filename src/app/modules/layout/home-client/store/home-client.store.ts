import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { GiaoDien } from "../../../../models/GiaoDien";

export interface HomeClientState {
    items: any[];
    giaoDien?: GiaoDien;
    cart: { item: any, quantity: number }[];
}

export const initialState: HomeClientState = {
    items: [],
    giaoDien: undefined,
    cart: [],
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

    readonly cart$ = this.select((state) => state.cart);

    readonly addToCart = this.updater((state, item: any) => {
        const cart = [...state.cart];
        const idx = cart.findIndex(c => c.item.ten === item.ten);
        if (idx > -1) {
            cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + 1 };
        } else {
            cart.push({ item, quantity: 1 });
        }
        return { ...state, cart };
    });

    readonly clearCart = this.updater((state) => ({
        ...state,
        cart: [],
    }));
}