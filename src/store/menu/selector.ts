import React from "react";
import { RootState } from "../store";


export const selectMenuItem = (state: RootState) => state.menus.menuItem;

export const selectMenuSections = (state: RootState) => state.menus.sections;

export const selectMenuCollections = (state: RootState) => state.menus.collections;

export const selectMenuProducts = (state: RootState) => state.menus.products;

export const selectMenuActiveSectionName = (state: RootState): string => state.menus.active_section_name;

export const selectMenuActiveCollectionName = (state: RootState): string => state.menus.active_collection_name;

export const selectMenuPage = (state: RootState): number => state.menus.page;

export const selectMenuPageCount = (state: RootState): number => state.menus.page_count;

// EDIT MENU SELECTORS
export const selectMenuProduct = (state: RootState) => state.menus.menuProduct;
export const selectProductSections = (state: RootState) => state.menus.productSection;
export const selectPosProduct = (state: RootState) => state.menus.pos_products;

export const selectPosProductMatching = (state: RootState) => state.menus.pos_products_matching;

export const selectLocations = (state: RootState) => state.menus.locations;

export const selectAttribute_groups = (state: RootState) => state.menus.attribute_groups;
export const selectDefaultAttributes = (state: RootState) => state.menus.default_attributes;

// SELECT LOADING SELECT
export const selecMenuPageLoader = (state: RootState) => state.menus.loading;

// SUBMIT BTN LOADING 
export const selectBtnInProgress = (state: RootState): boolean => state.menus.btnSubmitInProgress;

// ALERT MODAL 
export const selectCreateProductAlertModal = (state: RootState): boolean => state.menus.alertModal;

// DEFAULT ATTRIBUTE 
export const selectDefaultAttributeList = (state: RootState) => state.menus.default_attribute_list;
export const selectPosAttributes = (state: RootState) => state.menus.pos_attributes;

// SEARCH PRODUCT NAME
export const selectSearchName = (state: RootState) => state.menus.search_name;

export const selectSortField = (state: RootState) => state.menus.field;
export const selectSortOrder = (state: RootState) => state.menus.sort_order;

export const selectSectionId = (state: RootState) => state.menus.section_id;
