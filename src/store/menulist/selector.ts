import { RootState } from "../store";
import { Menu, PublicationBody } from "./types";

export const selectMenuList = (state: RootState): Menu[] => state.menuList.menuList;

export const selectMenuListCurrentPage = (state: RootState): number => state.menuList.page;

export const selectMenuListPageCount = (state: RootState): number => state.menuList.page_count;

export const selectMenuListFilter = (state: RootState) => state.menuList.filter;

export const selectMenuUpdatedPrice = (state: RootState): unknown[] => state.menuList.updatedPriceList;

export const selectMenuUpdateLoader = (state: RootState): boolean => state.menuList.isFetching;

export const selectUpldateModalMode = (state: RootState): boolean => state.menuList.showUpdateModal;

export const selectPublicationCount = (state: RootState): null | PublicationBody[] => state.menuList.available_uploads;