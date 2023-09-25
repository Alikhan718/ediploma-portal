import React from 'react';
import { Box, Typography, useMediaQuery, } from "@mui/material";
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import styles from "../DiplomaPage.module.css";
import cn from "classnames";
import univ from './../../../assets/icons/FilterUn.svg';
import { FilterSection, } from "@src/layout/Filter/FilterSection";
import { Button, Input, Modal } from '@src/components';
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchText } from "@src/store/diplomas/selectors";
import { FilterAttributes } from "@src/layout/Header/Header";
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/Filter-icon.svg';
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";

import ReactGA from 'react-ga';
import { routes } from "@src/shared/routes";
import { isAuthenticated } from "@src/utils/userAuth";

export const DiplomaPageHeader: React.FC = (props) => {
	const dispatch = useDispatch();
	const matchesSm = useMediaQuery('(max-width:768px)');

	const [showFilter, setShowFilter] = React.useState(false);

	const navigate = useNavigate();
	const searchText = useSelector(selectSearchText);
	const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
		text: searchText,
		specialities: '',
		region: '',
		degree: '',
		year: 0,
		gpaL: 0,
		gpaR: 0,
	});


	const [open, setOpen] = React.useState(false);
	// const triggerSearchFilters = (filterAttributes: any) => {
	// 	console.log(filterAttributes);
	// 	dispatch(fetchSearch(filterAttributes));
	// };
	const getQueryWidth = () => {
		const matchesLg = useMediaQuery('(min-width:1200px)');
		const matchesMd = useMediaQuery('(max-width:1180px)');
		const matchesSm = useMediaQuery('(max-width:768px)');
		const matchesXs = useMediaQuery('(max-width:576px)');
		if (matchesXs) return "80%";
		if (matchesSm) return "60%";
		if (matchesMd) return "40%";
		if (matchesLg) return "25%";
	};
	const triggerSearchFilters = () => {
		dispatch(fetchSearch(filterAttributes));
		navigate(routes.diploma);
	};

	const [searchQuery, setSearchQuery] = React.useState('');
	return (
		<React.Fragment>
			<Box width="100%" mb="2rem" className={styles.mobMb1}>
				<Modal
					open={open}
					handleClose={() => setOpen(false)}
					maxWidth={getQueryWidth()}
					width={getQueryWidth()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

						<img src={NeedAuthorizationPic} alt="" />
						<Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
							fontWeight='600'
							variant="h6"
							component="h2">
							Для использования требуется авторизация
						</Typography>
						<Button variant='contained' sx={{
							marginTop: "1rem",
							padding: "1rem",
							width: "80%",
							fontSize: "1rem",
							fontWeight: "600",
							borderRadius: "2rem"
						}} onClick={() => {
							navigate(routes.login);
						}}>Авторизоваться</Button>
					</Box>
				</Modal>
				<Box display="flex"
					flexDirection="column"
					alignItems="start"
					className={styles.diplomasContainer}>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', }}>
						<Box display="flex" alignItems="center"  >
							<Button variant="outlined" sx={{ borderRadius: '48px', width: '30%', color: '#3B82F6', }}>
								<Filter style={{ marginRight: '10px', }} />
								Фильтр
							</Button>
							<Box sx={{ marginLeft: '55px', }}>
								<Input
									placeholder="Фамилия Имя, название вуза"
									fullWidth={true}
									inputSize="m"
									sx={{
										paddingRight: 0,
										width: '150%',
									}}
									endAdornment={
										<Button
											onClick={() => {
												triggerSearchFilters();
												ReactGA.event({
													category: 'User',
													action: 'Search',
													label: searchQuery,
												});
											}}
											buttonSize="m"
											variant="contained"
											sx={{
												padding: '16px 32px',
												borderRadius: '48px',
												margin: '4px'
											}}
										>
											Найти
											<SearchIcon style={{ filter: 'brightness(250%) contrast(101%)', width: '82px', marginLeft: '12px' }} />
										</Button>
									}
									onChange={(e) => {
										const query = e.target.value;
										setFilterAttributes({ ...filterAttributes, text: query });
										setSearchQuery(query);
									}}
								/>

							</Box>

						</Box>
						<Box>	<img src={univ} style={{ marginRight: '15px' }} />
							<img src={univ} style={{ marginRight: '5px' }} /></Box>
					</Box>

				</Box>

				{/* <FilterSection
					triggerSearchFilters={triggerSearchFilters}
					filterAttributes={filterAttributes}
					setFilterAttributes={setFilterAttributes}
					open={showFilter}
					setOpen={setShowFilter}
				/> */}
			</Box>
		</React.Fragment>
	);
};
