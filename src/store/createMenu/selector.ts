import React from "react";
import { RootState } from "../store";

export const selectUploadedMenu = (state: RootState) => state.createMenu.menus;
export const selectUploadMenuLoader = (state: RootState) => state.createMenu.loading;

export const selectMatchMenuSections = (state: RootState) => state.createMenu.sections;
export const selectActiveSectionName = (state: RootState) => state.createMenu.activeSectionName;

export const selectMatchMenuAggresgators = (state: RootState) => state.createMenu.aggregator;
export const selectMatchMenuPOS = (state: RootState) => state.createMenu.pos;
export const selectMatchMenuPage = (state: RootState) => state.createMenu.page;
export const selectMatchMenuPageCount = (state: RootState) => state.createMenu.page_count;