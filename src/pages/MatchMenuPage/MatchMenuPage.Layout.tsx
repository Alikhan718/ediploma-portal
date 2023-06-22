import React from 'react';

import { Box, Typography } from '@mui/material';

import { HeaderTitle } from '@src/components/HeaderTitle/HeaderTitle';
import { ReactComponent as SettingsIcon } from '@src/assets/icons/settings.svg';
import { Button, Pagination } from '@src/components';
import { MatchMenuItem } from './components/MatchMenuItem';
import { Link, useNavigate, useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearMatchMenuItems, getMatchMenuProducts, getMatchMenuSections, isMatchedAll, } from '@src/store/createMenu/reducer';
import {
	selectActiveSectionName,
	selectMatchMenuAggresgators,
	selectMatchMenuPage,
	selectMatchMenuPageCount,
	selectMatchMenuPOS,
	selectMatchMenuSections
} from '@src/store/createMenu/selector';
import { selectCurrentLocation } from '@src/store/locations/selector';
import { ScrollBox } from '@src/components/ScrollBox/ScrollBox';


export const MathMenuPageLayout: React.FC = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const restaurant_id = useSelector(selectCurrentLocation);
	const sections = useSelector(selectMatchMenuSections);
	const activeSectionName = useSelector(selectActiveSectionName);
	const aggregators = useSelector(selectMatchMenuAggresgators);
	const pos = useSelector(selectMatchMenuPOS);
	const page = useSelector(selectMatchMenuPage);
	const page_count = useSelector(selectMatchMenuPageCount);

	const handlePageChange = (page: number): void => {
		const payload = { menu_id: String(params.menuId), restaurant_id, section_name: activeSectionName, page };
		dispatch(getMatchMenuProducts(payload));
	};

	const handleSectionClick = (id: string): void => {
		const payload = { menu_id: String(params.menuId), restaurant_id, section_name: id };
		dispatch(getMatchMenuProducts(payload));
	};

	const matchAggregatorPos = (aggregator_product_id: string, pos_product_id: string, section: string): void => {
		const payload = { aggregator_product_id, pos_product_id, menu_id: params.menuId, section, page };
		// dispatch(matchingProduct(payload));
	};
	const onSubmit = (): void => {
		dispatch(isMatchedAll({ menuId: String(params.menuId), navigate }));
	};
	React.useEffect((): any => {
		return () => dispatch(clearMatchMenuItems());
	}, []);

	React.useEffect(() => {
		dispatch(getMatchMenuSections(String(params.menuId)));
	}, [params]);

	if (!pos) {
		return <Box display={"flex"} flexDirection="column" justifyContent="center" alignItems="center">
			<Typography display="block" mb="30px" fontSize="25px">Нет список продуктов для мэтчинга</Typography>
			<NavLink to="/app/createMenu/upload-file">Назад</NavLink>
		</Box>;
	}
	return (
		<React.Fragment>
			<Box width={"80%"}>


				<HeaderTitle
					title="Матчинг меню"
					backTo="/app/createMenu/upload-file"
				/>
				<ScrollBox>
					<SettingsIcon />
					{sections.map(item => (
						<div key={item.id}>
							<Button
								onClick={() => handleSectionClick(item.id)}
								variant={activeSectionName === item.id ? "contained" : "text"}
								color={activeSectionName === item.id ? "secondary" : "onyx"}
								buttonSize='m'> {item.name} </Button>
						</div>
					))}

				</ScrollBox>
				<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb="40px">
					<Typography width="78%" fontSize="20px" fontWeight="600">Блюда Glovo</Typography>
					<Typography width="31%" fontSize="20px" fontWeight="600">Блюда IIKO</Typography>
				</Box>

				<Box mb="50px">
					{/*1 MATCH MENU ITEMS */}
					{aggregators ? aggregators.map((item, index) => (
						<></>
						// <MatchMenuItem
						// 	key={`${item.id}__${index}`}
						// 	aggregator_id={item.id}
						// 	isMatched={item.sync}
						// 	imgUrl={item.images ? item.images[0] : ''}
						// 	section={item.section}
						// 	matchAggregatorPos={matchAggregatorPos}
						// 	productName={item.name ? item.name[0].Value : ""}
						// 	productDescription={item.description ? item.description[0].Value : ""}
						// 	productList={pos}
						// />
					)) : null}
				</Box>
				<Pagination currentPage={page} maxPage={page_count} onChange={handlePageChange} />
				<Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="20px">
					<Button variant="contained" size="large" onClick={onSubmit}>
						Сохранить и продолжить
					</Button>

				</Box>
			</Box>

		</React.Fragment>
	);
};