import { MenuDrawMode } from "@src/pages/ConfigureMenuPage/types";

export interface AttributeGroupPageLayoutProps {
  setDrawer: (val: MenuDrawMode) => void;
  searchAttributeGroups: (text: string) => void;
  // handleEdit: (product_id: string) => void;
  attribute_group_list: Array<any>,
}

export interface AttributeGroupHeaderProps {
  handleSearch: (text: string) => void
}

export enum OpenMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  CLOSE = 'CLOSE'
};
