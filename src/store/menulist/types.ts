import { Pagination } from "../generals/types";

export interface Menu {
  menu_id: string,
  name: string,
  is_active: boolean,
  is_deleted: boolean,
  is_sync: boolean,
  sync_attribute?: false,
  delivery: string,
  updated: Date,
  updated_at?: string,
  status: MenuUploadStatuses,

}

export type PublicationBody = {
  aggregator_name: string,
  count: number
};

export interface MenuListState {
  menuList: Menu[],
  available_uploads: PublicationBody[] | null
  updatedPriceList: unknown[],
  filter: {
    field: "delivery" | "name",
    search: string
  },
  showUpdateModal: boolean,
  isFetching: boolean,
  page: number,
  page_count: number,
}

enum MenuUploadStatuses {
  SUCCESS = "SUCCESS",
  PARTIALLY_PROCESSED = "PARTIALLY_PROCESSED",

  PROCESSING = "PROCESSING",
  NOT_PROCESSED = "NOT_PROCESSED",

  READY = "READY",
  NOT_READY = "NOT_READY",

  ERROR = "ERROR",
};


export interface FetchMenuListSuccessPayload {
  data: Menu[],
  total: number
}

export interface PublictionMenuPayload {
  delivery_service: string,
  menu_id: string,
  restaurant_id: string
}