export interface OrderAttribute {
  id: string,
  quantity: string,
  price: number,
  name: string
}

export interface OrderItems {
  id: string,
  quantity: number,
  price: number,
  name: string,
  attributes?: Array<any>
}

export enum OrderStatus {
  ACCEPTED = "ACCEPTED",
  SKIPPED = "SKIPPED",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  PICKED_UP_BY_CUSTOMER = "PICKED_UP_BY_CUSTOMER",
  DELIVERED = "DELIVERED",
  CANCELLED_BY_DELIVERY_SERVICE = "CANCELLED_BY_DELIVERY_SERVICE",
  FAILED = "FAILED"
}

export interface Order {
  order_id: "string",
  order_code: "string",
  store_id: "string",
  order_time: number,
  status: OrderStatus,
  comment: string,
  special_requirements?: "string",
  allergy_info: "string",
  delivery_service: "string",
  is_picked_up_by_customer?: "BY_COURIER",
  delivery_address: { name?: string | null, label?: string | null },
  customer: { name: string },
  restaurant: { name: string },
  products: [],
  estimated_total_price: number,
  delivery_fee: number,
  discount: number,
  total_price: number,
  currency: "string",
  items: OrderItems[]
}

export interface OrdersState {
  orders: Order[],

  only_active: boolean,

  field: null | string,
  direction: null | number,
  page: number,
  per_page: number,
  page_count: number,
  total_count: number
}

export type fetchOrdersReqBodyType = {
  page: number,
  field: string | null,
  direction: number | null,
  q: string | null,
  only_active: boolean | null,
  delivery_service?: string | null,
  status?: string | null,
  date_from?: string | null,
  date_to?: string | null,
};

export type OrdersSuccessPayload = {
  data: Order[],
  metadata: {
    page: number,
    per_page: number,
    page_count: number,
    total_count: number
  },
  field: string | null,
  direction: number | null,

};
