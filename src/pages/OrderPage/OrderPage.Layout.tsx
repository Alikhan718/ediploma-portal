import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { tableHead } from './generator';
import { OrderTable, ModalFilter } from './components';
import { OrderPageLayoutProps } from './types';
import { Filter, Pagination, Modal } from '@src/components';
import { selectPageCount } from '@src/store/stoplist/selector';
import { fetchOrders } from '@src/store/orders/actionCreators';
import { selectOrderDirection, selectOrderField, selectOrderPage, selectOrderPageCount, selectOrders } from '@src/store/orders/selector';



export const OrderPageLayout: React.FC<OrderPageLayoutProps> = ({ params, setParams }) => {
	const dispatch = useDispatch();
	const currentPage = useSelector(selectOrderPage);
	const page_count = useSelector(selectOrderPageCount);
	const direction = useSelector(selectOrderDirection);
	const field = useSelector(selectOrderField);
	const orders = useSelector(selectOrders);

	const [showFilter, setShowFilter] = React.useState(false);

	const [search, setSearch] = React.useState(params.has("q") ? params.get("q") || "" : "");
	const [only_active, setOnlyActive] = React.useState(false);

	const onClose = (): void => {
		setShowFilter(false);
	};
	const onOpen = (): void => {
		setShowFilter(true);
	};

	const handlePage = (page: number): void => {
		params.set("page", String(page));
		setParams(params);
		const direction = params.has("direction") ? Number(params.get("direction")) : 1;
		dispatch(fetchOrders({ page, field: params.get("field"), direction, q: params.get("q"), only_active: null }));
	};

	const onTableHeadCellClick = (field: string, direction: number): void => {
		dispatch(fetchOrders({ page: currentPage, field, direction, q: params.get("q"), only_active: Boolean(params.get("only_active")) }));
	};

	const handleSearch = (searchOrder: string): void => {
		setTimeout(() => { // async
			if (searchOrder.trim().length < 4) {
				return;
			}
			const page: number = (params.has("page") ? Number(params.get("page")) : 1);
			const direction = (params.has("direction") ? Number(params.get("direction")) : null);
			const only_active = (params.has("only_active"));
			dispatch(fetchOrders({ page, field: params.get("field"), direction, q: searchOrder, only_active })); //async
		}, 1000);
		setSearch(searchOrder); // async
	};

	const onActiveChange = (v: boolean): void => {
		const page: number = (params.has("page") ? Number(params.get("page")) : 1);
		const direction = (params.has("direction") ? Number(params.get("direction")) : null);
		const search = params.get("q");
		setOnlyActive(v);
		dispatch(fetchOrders({ page, field: params.get("field"), direction, q: search, only_active: v })); //async
	};

	React.useEffect(() => {

		if (field) {
			params.set("field", field);
			params.set("direction", String(direction));
		}

		(search.trim())
			? params.set("q", search)
			: params.delete("q");

		setParams(params);

	}, [currentPage, field, direction, search]);

	// TODO: IN FUTURE MAKE SET PARAMS WITH ONE USEEFFECT 



	return (
		<React.Fragment>
			<Modal open={showFilter} handleClose={onClose} maxWidth={700}>
				<ModalFilter params={params} setParams={setParams} onClose={onClose} />
			</Modal>

			<Filter
				title='Заказы'
				key={"ordersFilter"}
				search={search}
				setSearch={handleSearch}
				onOpen={onOpen}
				only_active={only_active}
				setOnlyActive={onActiveChange}
			/>

			<Box mt='40px' />
			<OrderTable
				tableHead={tableHead}
				tableBody={orders}
				field={field}
				direction={direction}
				onTableHeadCellClick={onTableHeadCellClick} />
			<Box mb='40px' />
			{orders.length ? <Pagination currentPage={currentPage} maxPage={page_count} onChange={handlePage} /> : null}
		</React.Fragment >
	);
};
