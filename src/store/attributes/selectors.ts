import { RootState } from "../store";

export const selectAttributes = (state: RootState): Array<any> => state.attributes.attribute_list;
export const selectProducts = (state: RootState): Array<any> => state.attributes.product_list;
export const selectAttributeGroupList = (state: RootState) => state.attributes.attribute_group_list;
export const selectAttributeGroupDetail = (state: RootState) => state.attributes.attribute_group;
export const selectAttributeLoader = (state: RootState): boolean => state.attributes.isFetching;
