
interface IcashSystemList {
  id: number,
  name: string
}

export const cashSystemList: IcashSystemList[] = [
  { id: 1, name: "IIKO" }
];

export const aggregators = [
  { id: 1, name: "Выберите агрегатор" },
  { id: 2, name: "Glovo" },
  { id: 3, name: "Wolt" }
];

export const checks = [
  { label: "Тип оплаты", controller: "null1" },
  { label: "Код заказа", controller: "null2" },
  { label: "Комментарии", controller: "null3" },
  { label: "Доставка", controller: "null4" },
  { label: "Адрес", controller: "null5" },
  { label: "Сдача от", controller: "nul6l" },
  { label: "От клиента принято", controller: "null7" },
  { label: "Номер заказа", controller: "null8" },
];

export const langauges = ["kz", "en", "ru"];
export const currencies = ["tenge", "dollar", "ruble"];

export enum PriceSource {
  POS = "POS",
  DELIVERY_SERVICE = "DELIVERY_SERVICE"
}

export const iikoStatusses = [
  { id: 1, status: 'Unconfirmed' },
  { id: 2, status: 'WainCooking' },
  { id: 3, status: 'ReadyforCooking' },
  { id: 4, status: 'Waiting' },
  { id: 5, status: 'OnWay' },
  { id: 6, status: 'Delivered' },
  { id: 7, status: 'Closed' },
];

export const woltStatusses = [
  { id: 1, status: 'Статус не выбран' },
  { id: 2, status: 'Accepted' },
  { id: 3, status: 'Ready' },
  { id: 4, status: 'Waiting' },
  { id: 5, status: 'Confirmed' },
  { id: 6, status: 'Delivered' },
  { id: 7, status: 'Production' },
];

interface Statusses {
  [key: string]: number
}

export const statusses: Statusses = {
  'Статус не выбран': 1,
  'Accepted': 2,
  'Ready': 3,
  'Waiting': 4,
  'Confirmed': 5,
  'Delivered': 6,
  'Production': 7
};
export const getWoltStatuses: { [key: number]: string } = {
  1: 'Статус не выбран',
  2: 'Accepted',
  3: 'Ready',
  4: 'Waiting',
  5: 'Confirmed',
  6: 'Delivered',
  7: 'Production'
};