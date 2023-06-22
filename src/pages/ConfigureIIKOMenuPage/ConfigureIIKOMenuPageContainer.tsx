import React, { useState } from 'react';

import { Box, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { AttributeGroupPage } from '@src/pages';

import { MenuDraweMode } from './types';
import { ConfigureIIKOMenuPageLayout } from './ConfigureIIKOMenuPage.Layout';
import { fetchMenuProducts, fetchMenuSection } from '@src/store/menu/actionCreators';
import { menu_routes, routes } from '@src/shared/routes';


const ConfigureIIKOMenuPageContainer: React.FC = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [drawer, setDrawer] = React.useState<MenuDraweMode>(MenuDraweMode.CLOSE);
	const menuID = String(params.menuId);

	const handlePageChangeOrSearch = (payload: any): void => {
		dispatch(fetchMenuProducts(payload));
	};
	const handleSection = (section_name: string, field: string, sort_order: number): void => {
		const payload = { menu_id: params.menuId, section_name: section_name, field: field, sort_order: sort_order };

		dispatch(fetchMenuProducts(payload));
	};
	const onClose = (): void => {
		setDrawer(MenuDraweMode.CLOSE);
		navigate(`/app/menu/configure/${menuID}`);
	};
	const handleEdit = React.useCallback((product_id: string): void => {
		setDrawer(MenuDraweMode.OPEN);
		navigate(`edit-product/${product_id}`);
	}, []);


	React.useEffect(() => {
		dispatch(fetchMenuSection(String(params.menuId)));
		const domain = params['*']?.split("/")[0];
		if (params['*'] === 'edit') {
			setDrawer(MenuDraweMode.OPEN);
		} else if (domain === 'edit-product' || domain === "edit-attribute-group" || domain === "create-product") {
			setDrawer(MenuDraweMode.OPEN);
		}
	}, []);

	React.useEffect(() => {
		if (!params["*"]) {
			setDrawer(MenuDraweMode.CLOSE);
		}
	}, [params]);

	return <React.Fragment>
		<ConfigureIIKOMenuPageLayout
			menuID={String(params.menuId)}
			handlePageChangeOrSearch={handlePageChangeOrSearch}
			handleSection={handleSection}
			setDrawer={setDrawer}
			handleEdit={handleEdit}
		/>

	</React.Fragment>;
};

export default ConfigureIIKOMenuPageContainer;
