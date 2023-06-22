import glovo from "@src/assets/icons/glovo.png";
import wolt from "@src/assets/icons/wolt.png";
// import yandex from "@src/assets/icons/wolt.png";

interface IDeliveryObj {
	[name: string]: string
}

export const delivery: IDeliveryObj = {
	"glovo": glovo,
	"wolt": wolt,
	"yandex": wolt
};

export type tableHeadType = {
	id: number,
	content: string,
	field: string
};

export const tableHead: Array<tableHeadType> = [
	{ id: 2, content: 'Дата Время', field: "order_time" },
	{ id: 4, content: 'Адрес доставки', field: "location" },
	{ id: 1, content: 'Код заказа', field: "id" },
	{ id: 5, content: 'Канал', field: "delivery_service" },
	{ id: 6, content: 'Статус', field: "order_status" },
];

export const statusList = [
	"ACCEPTED",
	"SKIPPED",
	"READY_FOR_PICKUP",
	"OUT_FOR_DELIVERY",
	"PICKED_UP_BY_CUSTOMER",
	"DELIVERED",
	"CANCELLED_BY_DELIVERY_SERVICE",
	"FAILED"
];

export const deliveryList = [
	"Glovo",
	"Wolt",
	"Yandex"
];