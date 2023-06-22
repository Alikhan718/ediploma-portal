export enum CALL_CENTER_ORDER_STATUS {
  PROCESSING = "PROCESSING",
  NEW = "NEW"
}

export interface ICallCenterOrder {
  id: string,
  order_code: string,
  delivery_address: string | null,
  order_time: number,
  status: CALL_CENTER_ORDER_STATUS
}

export interface ICallCenterLocation {
  id: string,
  name: string | null,
  address: string | null
}

export interface ICallCenter {
  new_orders: ICallCenterOrder[],
  in_proccess_orders: ICallCenterOrder[],
  locations: ICallCenterLocation[],
  callcenter_id: string
}