import { RootState } from "../store";

export const selectSelectAllLocations = (state: RootState) => state.selectAll.locations;
export const selectSelectAllOldProduct = (state: RootState) => state.selectAll.oldProduct;
export const selectSelectAllNewProduct = (state: RootState) => state.selectAll.newProduct;
export const selectSelectAllLoading = (state: RootState) => state.selectAll.isLoading;