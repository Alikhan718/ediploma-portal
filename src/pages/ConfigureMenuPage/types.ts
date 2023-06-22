
export interface IEditMenu {
  menuID: string
}
export interface IConfigureMenuPageLayout {
  menuID: string,
  handlePageChangeOrSearch: (p: any) => void,
  handleSection: (section_name: string,) => void,
  handleCollection: (id: string) => void,
  setDrawer: (val: MenuDrawMode) => void;
  handleEdit: (product_id: string) => void;
}

export interface IConfigureMenuHeader {
  setDrawer: (val: MenuDrawMode) => void,
  handleValidateMenu: () => void,
  menuID: string,
  onSearch: (page: number, search_name?: string) => void
}
export enum MenuDrawMode {
  CLOSE = "CLOSE",
  OPEN = "OPEN"
}
