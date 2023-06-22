export interface ICreateMenuState {
  menus: Array<any>,
  loading: boolean,
  menuID: null | string,
  sections: Array<any>,
  pos: Array<any>,
  aggregator: Array<any>,
  page: number,
  page_count: number,
  activeSectionName: string
}