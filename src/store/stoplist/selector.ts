import { RootState } from "../store";

export const selectStopList = (state: RootState) => state.stopLists.stopLists;

export const selectPage = (state: RootState) => state.stopLists.page;

export const selectPageCount = (state: RootState) => state.stopLists.page_count;

export const selectActiveName = (state: RootState) => state.stopLists.active_section_name;

export const selectProductStores = (state: RootState) => state.stopLists.productStores;

export const selectIsFetching = (state: RootState): boolean => state.stopLists.isFetching;

export const selectStopListSearchText = (state: RootState): string => state.stopLists.search_text;

export const selectStopListAggregators = (state: RootState) => state.stopLists.aggregators;

export const selectStopListActiveAggregatorName = (state: RootState) => state.stopLists.active_aggregtor_name;
