import React from 'react';

import { Box, Typography, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';

import { StopListPageLayoutProps } from './types';
import { Categories } from './components/Categories';
import { Pagination, MenuItem, Input, Button } from '@src/components';
import { fetchStopList, searchTextChange, } from '@src/store/stoplist/reducer';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { selectActiveName, selectPage, selectPageCount, selectStopList, selectStopListActiveAggregatorName, selectStopListAggregators, selectStopListSearchText } from '@src/store/stoplist/selector';
import { selectMenuList } from '@src/store/menulist/selector';


export const StopListPageLayout: React.FC<StopListPageLayoutProps> = ({ handleOpenDrawer }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const active_section_name = useSelector(selectActiveName);
	const stopList = useSelector(selectStopList);
	const aggregators = useSelector(selectStopListAggregators);
	const active_aggregator_name = useSelector(selectStopListActiveAggregatorName);
	const search_text = useSelector(selectStopListSearchText);
	const currentPage = useSelector(selectPage);
	const page_count = useSelector(selectPageCount);



	const handlePage = (page: number): void => {
		dispatch(fetchStopList(active_section_name || '', page, active_aggregator_name ?? ''));
	};

	const handleSectionName = (item: { name: string, value?: boolean }): void => {
		const { name, value } = item;
		if (name === "Активные") {
			dispatch(fetchStopList(name, 1, active_aggregator_name ?? '', value, ''));
		} else if (name === "Неактивные") {
			dispatch(fetchStopList(name, 1, active_aggregator_name ?? '', value, ''));
		} else {
			dispatch(fetchStopList(name, 1, active_aggregator_name ?? ''));
		}
	};

	const handleClickProduct = (id: string, is_available: boolean): void => {
		handleOpenDrawer(true);
		if (!is_available) {
			navigate(`enable-product/${id}`);
		} else {
			navigate(`disable-product/${id}`);
		}
	};

	const handleClickAggregator = (menu_id: string): void => {
		dispatch(fetchStopList('Все', 1, menu_id, undefined, ''));
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const search_text = e.target.value.trim();
		if (search_text.length > 3) {
			dispatch(fetchStopList(active_section_name || '', currentPage, active_aggregator_name ?? '', undefined, e.target.value.trim()));
		} else if (search_text.length === 0) {
			dispatch(fetchStopList(active_section_name || '', currentPage, active_aggregator_name ?? '', undefined, ''));
		} else {
			dispatch(searchTextChange(e.target.value));
		}
	};


	return (
		<Box p="10px 0" style={{ maxWidth: "calc(100vw - 367px) !important" }}>

			{/* STOPLIST HEADER */}
			<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb="50px">
				<Typography fontSize="32px" fontWeight="700">Стоп-лист</Typography>
				<Input
					value={search_text}
					inputSize='m'
					placeholder='Поиск'
					onChange={handleSearch}
					endAdornment={<SearchIcon />} />
			</Box>

			<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
				<Categories
					categories={stopList}
					active_section_name={active_section_name}
					handleSectionName={handleSectionName}
				/>
				<Box display="flex" gap="5px" >
					{aggregators.map((item, index) => {
						return (
							<Button
								key={item.menu_id}
								color="success"
								onClick={() => handleClickAggregator(item.menu_id)}
								variant={active_aggregator_name === item.menu_id ? "contained" : "text"}>
								{item.delivery}
							</Button>);
					})}
				</Box>

			</Box>

			<Box mt='40px' />
			<Box width="100%">

				{stopList?.map((item: any, index: number) => (
					<Box
						key={index}
					>
						<MenuItem key={index} menuItem={item} hanldeClickProduct={handleClickProduct}>
						</MenuItem>
					</Box>))}
			</Box>
			<Box mt='40px' />
			<Pagination currentPage={currentPage} maxPage={page_count} onChange={handlePage} />
		</Box>
	);
};
