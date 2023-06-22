export enum FORM_MODE {
  CREATE = "CREATE",
  EDIT = "EDIT"
}
export interface EditProductFormProps {
  attributes: any[]
  default_attributes: any[]
  pos_products?: any[]
  sections_product: any[]
  editUrl: string
  onSubmit: (data: any) => void
  setModalOpen: (value: boolean) => void
  product: any
  locations: any[]
  pos_attributes?: any[]
  formMode: FORM_MODE,
  handleCloseDrawer: () => void
}

export interface EditAttributeFormProps {
  attribute_group: any,
  onSubmit: (body: any) => void
}

export interface IPosProductSelect {
  productId: string,
  pos_products: any,
  control: any
}