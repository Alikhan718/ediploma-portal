import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { OrderPageLayout } from './OrderPage.Layout';
import { selectCurrentLocation } from '@src/store/locations/selector';
import { fetchOrders } from '@src/store/orders/actionCreators';


const OrderPageContainer: React.FC = () => {
	const dispatch = useDispatch();
	const currLocation = useSelector(selectCurrentLocation);
	const [params, setParams] = useSearchParams();


	React.useEffect(() => {
		const oldRestaurant_id = localStorage.getItem("oldRestaurant_id");
		if (oldRestaurant_id === currLocation) {
			const payload = {
				page: Number(params.get("page") || 1),
				field: params.get("field"),
				direction: Number(params.get("direction")),
				q: (params.get("q")),
				only_active: Boolean(params.get("only_active"))
			};
			dispatch(fetchOrders(payload));
		} else {
			setParams("");
			dispatch(fetchOrders({ page: 1, q: null, only_active: null, field: null, direction: null }));
		}
	}, [currLocation]);

	React.useEffect(() => {
		return () => localStorage.removeItem("oldRestaurant_id");
	}, []);
	window.onbeforeunload = function (): void {
		localStorage.setItem("oldRestaurant_id", currLocation);
	};

	return <OrderPageLayout params={params} setParams={setParams} />;

};

export default OrderPageContainer;