import React from 'react';

import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import {Button, Pagination} from '@src/components';
import {ConfigureIIKOMenuHeader} from './components/ConfigureIIKOMenuHeader/ConfigureIIKOMenuHeader';
import {IConfigureMenuPageLayout} from './types';
import {
	selectMenuActiveSectionName,
	selectMenuPage,
	selectMenuPageCount,
	selectMenuProducts,
	selectMenuSections,
	selectSearchName,
	selectSectionId,
	selectSortField,
	selectSortOrder
} from '@src/store/menu/selector';
import {ScrollBox} from '@src/components/ScrollBox/ScrollBox';
import styles from './ConfigureMenuPage.module.css';
import {fetchMenuSection} from '@src/store/menu/actionCreators';
import {tableHead} from './generator';
import {ProductTable} from "@src/pages/ConfigureIIKOMenuPage/components/ProductTable";
import {selectAttributeGroupList} from "@src/store/attributes/selectors";
import {fetchAttributeGroup} from "@src/store/attributes/actionCreators";

export const ConfigureIIKOMenuPageLayout: React.FC<IConfigureMenuPageLayout> = (props) => {
	const dispatch = useDispatch();
	const {menuID, handlePageChangeOrSearch, handleSection} = props;

	const menu_sections = useSelector(selectMenuSections);
	const menu_products = useSelector(selectMenuProducts);
	const active_section = useSelector(selectMenuActiveSectionName);
	const search_text = useSelector(selectSearchName);
	const field = useSelector(selectSortField);
	const sort_order = useSelector(selectSortOrder);
	const section_id = useSelector(selectSectionId);
	const page = useSelector(selectMenuPage);
	const page_count = useSelector(selectMenuPageCount);
	const attributesGroupList = useSelector(selectAttributeGroupList);

	React.useEffect(() => {
		dispatch(fetchAttributeGroup(menuID));
	}, []);

	const onChangePageOrSearch = (page: number, search_name_props?: string): void => {

		let search_name = search_name_props;
		if (search_name) {
			// PAGINATION WITH FILTER
			const payload: any = {page, menu_id: menuID, section_name: section_id, search_name: search_name};
			handlePageChangeOrSearch(payload);
		} else {
			dispatch(fetchMenuSection(String(menuID)));
		}
	};
	const handlePageChange = (page: number): void => {
		const payload: any = {
			page,
			menu_id: menuID,
			section_name: active_section,
			search_name: search_text,
			field: field ?? "price",
			sort_order: sort_order ?? -1
		};
		handlePageChangeOrSearch(payload);
	};
	return (
		<Box className={styles.scrollBoxContainer}>
			{/* CONFIGURE MENU HEADER */}
			<ConfigureIIKOMenuHeader onSearch={onChangePageOrSearch}/>
			<Box mt='40px'/>
			{/* SECTIONS MODAL [EDIT,ADD] */}
			<Box>
				<ScrollBox>
					{menu_sections ? menu_sections!.map((item: any,) => (

						<Button
							key={item.id}
							buttonSize='m'
							className={styles.sectionBtn}
							style={{"background": active_section === item.id ? "" : "#F3F5F3"}}
							variant={active_section === item.id ? 'contained' : 'outlined'}
							color={active_section === item.id ? 'secondary' : 'primary'}
							onClick={() => handleSection(item.id, "price", 1)}
						>
							{item.name}
						</Button>

					)) : null}
				</ScrollBox>
			</Box>
			<Box mt='40px'/>
			{/* PRODUCTS */}
			<Box className={styles.scrollbarContainer} overflow="auto">
				<ProductTable
					tableBody={menu_products}
					tableHead={tableHead}
					menuSections={menu_sections}
					attributeGroups={attributesGroupList}
					handleSort={() => {
					}}
				/>
			</Box>
			{page_count > 0 ? <Pagination maxPage={page_count} currentPage={page} onChange={handlePageChange}/> : null}
		</Box>
	);
};
