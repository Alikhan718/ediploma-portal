import React from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import styles from "../EmployersListPage.module.css";
import {ReactComponent as Filter} from '@src/assets/icons/Tuning 2.svg';
import cn from "classnames";
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal } from '@src/components';
import { useDispatch, useSelector } from "react-redux";
import { routes } from "@src/shared/routes";
import ReactGA from 'react-ga';
import {EmployerFilterAttributes} from "@src/layout/Header/Header";
import { selectSearchText } from "@src/store/diplomas/selectors";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/EmployersListPage/generator';
import { EmployerFilter } from '@src/layout/EmployerFilter/EmployerFilter';
import { fetchEmployersSearch } from '@src/store/auth/actionCreators';

interface EmployerHeaderProps {
	listView: boolean;
	setListView: any;
};

export const EmployerListPageHeader: React.FC<EmployerHeaderProps> = (props) => {
	const { listView, setListView } = props;
	const lang = useSelector(selectLanguage);
	const searchText = useSelector(selectSearchText);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width: 778px)');
	const [showFilter, setShowFilter] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [filterAttributes, setFilterAttributes] = React.useState<EmployerFilterAttributes>({field: '', text: ''});

	const triggerSearchFilters = (filterAttributesNew: any) => {
		dispatch(fetchEmployersSearch(filterAttributesNew));
		navigate(routes.employersList);
	};

	return (
		<React.Fragment>
			<Box width='100%' mb='1rem' className={cn(styles.mobMb1, styles.universitiesContainer)} mt="2rem">
				<Typography fontWeight='700' mb="1rem" className={cn(styles.mobPl1, styles.mobTextL)} fontSize='2.5rem'>
					{localization[lang].Header.university}
				</Typography>
				<Box width="100%" className={styles.mobMb1}>
					<Box display="flex"
						flexDirection="column"
						alignItems="start"
					>
						<Box sx={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
						}}>
							<Box display="flex" width="100%" flexWrap="wrap" flexDirection="row" gap="1rem"
								alignItems="center"
							>
								<Button
									onClick={() => {
										setShowFilter(!showFilter);
									}}
									variant="outlined"
									sx={{ display: 'none', borderRadius: '48px', paddingX: "3rem", color: '#3B82F6', '@media (max-width: 778px)': {display: 'flex'}}}
									startIcon={<Filter/>}
                            	>
                                	{localization[lang].Header.filter}
                            	</Button>
								<Box display="flex" gap="1rem" ml="auto" alignContent="flex-end">
								</Box>
								<Box display="flex">
									<Input
										placeholder={localization[lang].Header.searchBar}
										fullWidth
										inputSize="m"
										sx={{
											paddingRight: 0,
										}}
										endAdornment={
											<Button
												onClick={() => {
													triggerSearchFilters(filterAttributes);
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
												{localization[lang].Header.searchButton}
												<SearchIcon style={{
													filter: 'brightness(250)',
													width: '82px',
													marginLeft: '12px'
												}} />
											</Button>
										}
										onChange={(e) => {
											const query = e.target.value;
											setFilterAttributes({ ...filterAttributes, text: query });
											setSearchQuery(query);
										}}
									/>
								</Box>
								<Box sx={{display: 'flex', gap:'1rem', '@media (max-width: 778px)': {display: 'none'}}}>
									<Box 
										onClick={() => setListView(true)}
										sx={{
											display: 'flex',
											width: '3rem',
											height: '3rem',
											borderRadius: '50%',
											backgroundColor: listView ? '#3B82F6' : 'white',
											'&:hover': {
												backgroundColor: listView ? '#2C7ED2' : '#F7F7F7',
											}
										}}
									>
										
									</Box>
									<Box 
										onClick={() => setListView(false)}
										sx={{
											display: 'flex',
											width: '3rem',
											height: '3rem',
											borderRadius: '50%',
											backgroundColor: !listView ? '#3B82F6' : 'white',
											'&:hover': {
												backgroundColor: !listView ? '#2C7ED2' : '#F7F7F7',
											}
										}}
									>
										
									</Box>
								</Box>
							</Box>
						</Box>

					</Box>
				</Box>
			</Box>
			<Box sx={{display: isMobile ? 'block' : 'none' }}>
			<EmployerFilter
				triggerSearchFilters={triggerSearchFilters}
				filterAttributes={filterAttributes}
				setFilterAttributes={setFilterAttributes}
				open={showFilter}
				setOpen={setShowFilter}
				toggleBottomSheet={null}
			/>
			</Box>
		</React.Fragment>
	);
};