
export interface MenuState {
  menuItem: any,
  products: any[],

  collections?: any[],
  sections: any[],


  menuProduct: any,
  productSection: any[],
  pos_products_matching: any[],
  pos_products: any[],
  pos_attributes: any[],
  alertModal: boolean,

  locations: any[],

  search_name: string,

  field: string,
  sort_order: number,
  section_id: string,
  attribute_groups: any[],
  default_attributes: any[],
  default_attribute_list: any[],
  loading: boolean,
  btnSubmitInProgress: boolean,

  active_section_name: string,
  active_collection_name: string,

  page: number,
  page_count: number,
}