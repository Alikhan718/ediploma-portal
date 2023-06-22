export interface IStopListState {
  stopLists: Array<any>,
  aggregators: Array<any>,
  productStores: Array<any>,

  isFetching: boolean,

  search_text: string,

  active_section_name: null | string,
  active_aggregtor_name: null | string,
  page: number,
  per_page: number,
  page_count: number
}