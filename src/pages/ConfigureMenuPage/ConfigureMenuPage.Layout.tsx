import React from 'react';

import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Pagination } from '@src/components';
import { ReactComponent as EditIcon } from '@src/assets/icons/editIcon.svg';
import { ConfigureMenuHeader } from './components/ConfigureMenuHeader/ConfigureMenuHeader';
import { IConfigureMenuPageLayout } from './types';
import { ScrollBox } from '@src/components/ScrollBox/ScrollBox';
import { MenuProduct } from './components/MenuProduct';
import { MenuSection } from './components/MenuSections';
import { MenuSectionWolt } from './components/MenuSectionsWolt';
import styles from './ConfigureMenuPage.module.css';
import { MatchMenuItem } from '../MatchMenuPage/components/MatchMenuItem';
import { checkMenuValidation, deleteMenuProduct, fetchMenuSection, matchingProduct } from '@src/store/menu/actionCreators';
import {
	selectBtnInProgress, selectMenuActiveCollectionName, selectMenuActiveSectionName, selectMenuCollections, selectMenuPage, selectMenuPageCount,
	selectMenuProducts, selectMenuSections, selectPosProduct, selectSearchName, selectSectionId, selectSortField, selectSortOrder
} from '@src/store/menu/selector';
import { useParams } from 'react-router-dom';

export const ConfigureMenuPageLayout: React.FC<IConfigureMenuPageLayout> = (props) => {
	const dispatch = useDispatch();
	const params = useParams();
	const { menuID, handlePageChangeOrSearch, handleSection, setDrawer, handleEdit, handleCollection } = props;

	const menu_sections = useSelector(selectMenuSections);
	const menu_collections = useSelector(selectMenuCollections);
	const btnSubmitStatus = useSelector(selectBtnInProgress);
	const menu_products = useSelector(selectMenuProducts);
	const pos_products = useSelector(selectPosProduct);
	const active_section = useSelector(selectMenuActiveSectionName);
	const active_collection = useSelector(selectMenuActiveCollectionName);
	const search_text = useSelector(selectSearchName);
	const field = useSelector(selectSortField);
	const sort_order = useSelector(selectSortOrder);
	const section_id = useSelector(selectSectionId);
	const page = useSelector(selectMenuPage);
	const page_count = useSelector(selectMenuPageCount);

	const [sectionModal, setSectionModal] = React.useState(false);

	const openSectionModal = (): void => setSectionModal(true);
	const closeSectionModal = React.useCallback((): void => setSectionModal(false), []);
	const onChangePageOrSearch = (page: number, search_name_props?: string): void => {

		let search_name = search_name_props;
		if (search_name) {
			// PAGINATION WITH FILTER
			const payload: any = { page, menu_id: menuID, section_name: section_id, search_name: search_name };
			handlePageChangeOrSearch(payload);
		}
		else {
			dispatch(fetchMenuSection(String(menuID)));
		}
	};
	const handlePageChange = (page: number): void => {
		const payload: any = { page, menu_id: menuID, section_name: active_section, search_name: search_text, field: field ?? "price", sort_order: sort_order ?? -1 };
		handlePageChangeOrSearch(payload);
	};
	const handleMatchProductPos = (aggregator_product_id: string, pos_product_id: string, available: boolean, section: string): void => {
		const payload = { aggregator_product_id, pos_product_id, available, menu_id: menuID, section, page };
		dispatch(matchingProduct(payload));
	};
	const handleValidateMenu = (): void => {
		dispatch(checkMenuValidation(menuID));
	};
	const handleProductDelete = React.useCallback((product_id: string, isDeleted: boolean = false): void => {
		dispatch(deleteMenuProduct({ menu_id: props.menuID, product_id: product_id, isDeleted: !isDeleted, }));
	}, []);

	return (
		<Box className={styles.scrollBoxContainer}>
			{/* CONFIGURE MENU HEADER */}
			<ConfigureMenuHeader setDrawer={setDrawer} menuID={menuID} handleValidateMenu={handleValidateMenu} onSearch={onChangePageOrSearch} />
			{params.aggregator === "wolt" ? null : <Box mt='40px' />}
			{/* SECTIONS MODAL [EDIT,ADD] */}
			{params.aggregator === "wolt"
			? <MenuSectionWolt 
				open={sectionModal}
				btnSubmitStatus={btnSubmitStatus}
				handleClose={closeSectionModal}
				menu_collections={menu_sections}
				menu_id={menuID} />
			: <MenuSection
				open={sectionModal}
				btnSubmitStatus={btnSubmitStatus}
				handleClose={closeSectionModal}
				menu_collections={menu_collections}
				menu_id={menuID} />
			}
			{/* SECTIONS */}
			<Box>
				{/* COLLECTIONS */}

				<ScrollBox>
					{params.aggregator === "wolt" 
						? null 
						: <Box mr='10px'>
							<EditIcon onClick={openSectionModal} className={styles.settingsIcon} />
						  </Box>
					}

					{menu_collections && menu_collections?.filter((item: any) => !item.is_deleted).map((item: any) => (
						<Button
							key={item.id}
							buttonSize="m"
							className={styles.sectionBtn}
							onClick={() => handleCollection(item.id)}
							style={{ "background": active_collection === item.id ? "" : "#F3F5F3" }}
							variant={active_collection === item.id ? 'contained' : 'outlined'}
							color={active_collection === item.id ? 'secondary' : 'primary'}
							sx={{ borderColor: '#B0B0B0', '&:hover': { backgroundColor: active_collection === item.id ? "" : '#E8E8E8 !important' } }}
						>
							{item.name}
						</Button>
					))}
				</ScrollBox>

				<Box height='10px'></Box>

				{/* SECTIONS */}
				<ScrollBox>
					{params.aggregator === "wolt"
					? <Box mr='10px'>
						<EditIcon onClick={openSectionModal} className={styles.settingsIcon} />
					  </Box>
					: null}

					{menu_sections?.sort((a, b) => a.collection_order - b.collection_order)
						.filter((item: any) => !item.is_deleted).map((item: any,) => (

						<Button
							key={item.id}
							buttonSize='m'
							className={styles.sectionBtn}
							style={{ "background": active_section === item.id ? "" : "#F3F5F3" }}
							variant={active_section === item.id ? 'contained' : 'outlined'}
							color={active_section === item.id ? 'secondary' : 'primary'}
							onClick={() => handleSection(item.id)}
							sx={{ borderColor: '#B0B0B0', '&:hover': { backgroundColor: active_section === item.id ? "" : '#E8E8E8 !important' } }}
						>
							{item.name}
						</Button>

					))}
				</ScrollBox>

				<Box height='10px'></Box>

			</Box>

			{/* PRODUCTS */}
			<Box className={styles.scrollbarContainer} overflow="hidden">
				{menu_products ? menu_products.map((menuProd: any, index: number) => {
					if (!menuProd.sync) {
						return <MatchMenuItem
							key={`${menuProd.id}_${index}`}
							product={menuProd}
							section={menuProd.section}
							matchAggregatorPos={handleMatchProductPos}
							handleDelete={handleProductDelete}
							posProducts={pos_products} />;
					}
					return <MenuProduct
						key={`${menuProd.id}@${index}`}
						// posProducts={pos_products}
						menuProduct={menuProd}
						handleEdit={handleEdit}
						handleDelete={handleProductDelete} />;
				})
					: <Typography>Нет продуктов</Typography>}
			</Box>
			{page_count > 0 ? <Pagination maxPage={page_count} currentPage={page} onChange={handlePageChange} /> : null}
		</Box>
	);
};
