import React from 'react';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import styles from "../UniversityPage.module.css";
import cn from "classnames";
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal } from '@src/components';
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import { routes } from "@src/shared/routes";
import ReactGA from 'react-ga';
import univ from './../../../assets/icons/FilterUn.svg';
import secuniv from './../../../assets/icons/Icons.svg';
import { selectSearchText } from "@src/store/diplomas/selectors";
import { FilterAttributes } from "@src/layout/Header/Header";
export const UniversityPageHeader: React.FC = (props) => {


	const searchText = useSelector(selectSearchText);
	const navigate = useNavigate();

	const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
		text: searchText,
		specialities: '',
		region: '',
		degree: '',
		year: 0,
		gpaL: 0,
		gpaR: 0,
	});
	const dispatch = useDispatch();

	const triggerSearchFilters = () => {
		dispatch(fetchSearch(filterAttributes));
		navigate(routes.diploma);
	};

	const [searchQuery, setSearchQuery] = React.useState('');
	return (
		<React.Fragment>
			<Box width='90%' mb='1rem' className={styles.mobMb1}>
				<Typography fontWeight='700' className={cn(styles.mobPl1, styles.mobTextL)} fontSize='2rem'>
					Университеты
				</Typography>
				<Box width="100%" className={styles.mobMb1}>
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
										className={styles.responsiveInput}
										sx={{
											paddingRight: 0,
											width: '500px'
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
							<Box>	<img src={secuniv} style={{ marginRight: '15px' }} />
								<img src={univ} style={{ marginRight: '5px', marginBottom: '5px' }} /></Box>
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
			</Box>
		</React.Fragment>
	);
};
