import React from 'react';

import { Box, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { AttributeGroupPage } from '@src/pages';

import { MenuDrawMode } from './types';
import { EditAttribute } from './components/EditAttribute';
import { EditMenu } from './components/EditMenu';
import { EditProduct } from './components/EditProduct';
import { ConfigureMenuPageLayout } from './ConfigureMenuPage.Layout';
import { clearMenuInfo, fetchMenuCollections, fetchMenuProducts, fetchMenuSection, handleCollectionClick } from '@src/store/menu/actionCreators';
import { menu_routes, routes } from '@src/shared/routes';
import { CreateProduct } from './components/CreateProduct';
import { SelectAllContainer } from '../SeletAll/SelectAll.Container';


const ConfigureMenuPageContainer: React.FC = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [drawer, setDrawer] = React.useState<MenuDrawMode>(MenuDrawMode.CLOSE);
	const menuID = String(params.menuId);
	const aggregator = String(params.aggregator);

	const handlePageChangeOrSearch = (payload: any): void => {
		dispatch(fetchMenuProducts(payload));
	};
	const handleSection = (section_name: string): void => {
		const payload = { menu_id: menuID, section_name };
		dispatch(fetchMenuProducts(payload));
	};
	const handleCollection = (collection_id: string): void => {
		const payload = { collection_id, menu_id: menuID };
		dispatch(handleCollectionClick(payload));
	};
	const onClose = (): void => {
		setDrawer(MenuDrawMode.CLOSE);
		navigate(`/app/menu/configure/${aggregator}/${menuID}`);
	};
	const handleEdit = React.useCallback((product_id: string): void => {
		setDrawer(MenuDrawMode.OPEN);
		navigate(`edit-product/${product_id}`);
	}, []);

	React.useEffect(() => {
		if (aggregator === 'wolt') {
			dispatch(fetchMenuSection(menuID));
		} else {
			dispatch(fetchMenuCollections(menuID));
		}
		const domain = params['*']?.split("/")[0];
		if (params['*'] === 'edit') {
			setDrawer(MenuDrawMode.OPEN);
		} else if (domain === 'edit-product' || domain === "edit-attribute-group" || domain === "create-product") {
			setDrawer(MenuDrawMode.OPEN);
		}
		return () => {
			dispatch(clearMenuInfo());
		};
	}, []);

	React.useEffect(() => {
		if (!params["*"]) {
			setDrawer(MenuDrawMode.CLOSE);
		}
	}, [params]);

	return <React.Fragment>
		<ConfigureMenuPageLayout
			menuID={String(params.menuId)}
			handlePageChangeOrSearch={handlePageChangeOrSearch}
			handleSection={handleSection}
			handleCollection={handleCollection}
			setDrawer={setDrawer}
			handleEdit={handleEdit}
		/>
		{/*<AttributeGroupListDrawer*/}
		{/*	attribute_groups={attribute_groups}*/}
		{/*	open={drawer === MenuDrawMode.OPEN}*/}
		{/*/>*/}
		<Drawer open={drawer === MenuDrawMode.OPEN} onClose={onClose} anchor="right">
			<Box p="20px" width="800px" height="100%">
				<Routes>
					<Route path={routes.attributeGroup} element={<AttributeGroupPage />} />
					<Route path={menu_routes.edit} element={<EditMenu menuID={menuID} />} />
					<Route path={menu_routes.edit_product} element={<EditProduct open={true} navigate={navigate} menuID={menuID} />} />
					<Route path={menu_routes.create_product} element={<CreateProduct menuID={menuID} />} />
					<Route path={menu_routes.edit_attribute_group} element={<EditAttribute menuID={menuID} />} />
					<Route path={menu_routes.select_all} element={<SelectAllContainer />} />
				</Routes>
			</Box>
		</Drawer>
	</React.Fragment>;
};

export default ConfigureMenuPageContainer;
