import React from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLocation } from '@src/store/locations/selector';
import { fetchMenuList } from '@src/store/menulist/actionCreators';
import { selectMenuList, selectMenuListCurrentPage, selectMenuListPageCount, selectUpldateModalMode, selectPublicationCount } from '@src/store/menulist/selector';
import { MenuPageLayout } from './MenuPage.Layout';

const MenuPageContainer: React.FC = () => {
	const dispatch = useDispatch();
	const [params, setParams] = useSearchParams({ page: '1' });

	const restaurant_id = useSelector(selectCurrentLocation);
	const menuList = useSelector(selectMenuList);
	const page = useSelector(selectMenuListCurrentPage);
	const page_count = useSelector(selectMenuListPageCount);
	const showUpdateModal = useSelector(selectUpldateModalMode);
	const available_uploads = useSelector(selectPublicationCount)

	const handlePage = (page: number): void => {
		params.set("page", page.toString());
		setParams(params);
		dispatch(fetchMenuList(params.toString()));
	};
	const handleSort = (sortName: string): void => {
		params.set("field", sortName);
		setParams(params);
		dispatch(fetchMenuList(params.toString()));
	};
	// React.useEffect(() => {
	// 	setParams('');
	// 	dispatch(fetchMenuList(''));
	// }, [restaurant_id]);

	React.useEffect(() => {
		const OldRestId = localStorage.getItem("OldRestId");
		if (restaurant_id !== OldRestId) {
			setParams("");
			dispatch(fetchMenuList(''));
		} else {
			dispatch(fetchMenuList(params.toString()));
		}
	}, [restaurant_id]);
	window.onbeforeunload = function (): void {
		localStorage.setItem("OldRestId", restaurant_id);
	};

	React.useEffect(() => {
		return () => localStorage.removeItem("OldRestId");
	}, []);
	return (
		<React.Fragment>
			<MenuPageLayout
				menuList={menuList}
				available_uploads={available_uploads}
				restaurant_id={restaurant_id}
				page={page}
				page_count={page_count}
				showUpdateModal={showUpdateModal}
				handlePage={handlePage}
				handleSort={handleSort} />
		</React.Fragment>
	);
};

export default MenuPageContainer;