import { RootState } from "../store";
import { Order } from "./types";

export const selectOrderPage = (state: RootState): number => state.orders.page;
export const selectOrderPageCount = (state: RootState): number => state.orders.page_count;
export const selectOrderDirection = (state: RootState): number | null => state.orders.direction;
export const selectOrderField = (state: RootState): string | null => state.orders.field;
export const selectOrders = (state: RootState): Order[] => state.orders.orders;