
export interface LocationPageLayoutProps {
  locations: Array<any>,
  loading: boolean,
  page_count: number,
  field: string,
  direction: number,
  page: number,
  order: number
}

export interface LocationHeaderProps {
  handleOpenDrawer: () => void,
  handleSearch: (text: string) => void
}

export enum OpenMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  CLOSE = 'CLOSE'
};