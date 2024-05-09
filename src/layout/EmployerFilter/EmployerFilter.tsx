import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button, Chip,
	SelectChangeEvent,
	Typography,
	useMediaQuery
} from "@mui/material";
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import {fields, scopeOfActivity, localization} from "@src/layout/Filter/generator";
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '@src/store/generals/selectors';
import { cancelEmployerFilters, fetchEmployersList } from '@src/store/auth/actionCreators';

import { ReactComponent as ExpandMoreIcon } from '@src/assets/icons/expandmore.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/Tuning 2.svg';
import FilterSelect from "@src/components/FilterSelect/FilterSelect";

export const EmployerFilter: React.FC<IFilter> = (props) => {
	const {filterAttributes, setFilterAttributes, triggerSearchFilters, toggleBottomSheet } = props;
	const [selectedFields, setSelectedFields] = React.useState<string[]>([]);
	const [selectedScopeOfActivities, setSelectedScopeOfActivities] = React.useState<string[]>([]);
	const dispatch = useDispatch()

	const lang = useSelector(selectLanguage);
	const translatedFields = fields[lang];
	const translatedScopeOfActivities = scopeOfActivity[lang];
	const isSmallerThanMd = useMediaQuery('(max-width:1200px)');

	const filter = (type:string, arr: any) => {

		let filterValues = {
			text: filterAttributes.text,
			field: selectedFields.join(",") ?? filterAttributes.field,
			scopeOfActivity: selectedScopeOfActivities.join(",") ?? filterAttributes.scopeOfActivity,
		};

		if (type === "field") {
			filterValues.field = arr.join(",");
			filterValues.scopeOfActivity = arr.join(",");
		}

		// Update the filterAttributes state
		setFilterAttributes(filterValues);

		if (filterValues.field.length ||
			filterValues.scopeOfActivity.length) {
			triggerSearchFilters(filterValues);
		} else {
			dispatch(cancelEmployerFilters());
			dispatch(fetchEmployersList());
		}
	};

	const handleChange = (e: any, arr: any, setE: any, type: string) => {
		const updatedValues = arr.includes(e) ? arr.filter((i: any) => i !== e) : [...arr, e];
		setE(updatedValues);

		filter(type, updatedValues);
	};

	const handleFieldClick = (value: string) => {
		const updatedFields = selectedFields.includes(value) ? selectedFields.filter((field: string) => field !== value) : [...selectedFields, value];
		setSelectedFields(updatedFields);

		filter("field", updatedFields);
	};

	const handleDeleteChipSpeciality = (chipToDelete: string) => {
		const updatedFields = selectedFields.filter((field: string) => field !== chipToDelete);
		setSelectedFields(updatedFields);

		filter("field", updatedFields);
	};

	const handleScopeClick = (value: string) => {
		const updatedScopeOfActivities = selectedScopeOfActivities.includes(value) ? selectedScopeOfActivities.filter((scope: string) => scope !== value) : [...selectedScopeOfActivities, value];
		setSelectedScopeOfActivities(updatedScopeOfActivities);

		filter("scope", updatedScopeOfActivities);
	};

	const handleDeleteChipScope = (chipToDelete: string) => {
		const updatedScopeOfActivities = selectedScopeOfActivities.filter((scope: string) => scope !== chipToDelete);
		setSelectedScopeOfActivities(updatedScopeOfActivities);

		filter("scope", updatedScopeOfActivities);
	};

	const handleApply = () => {
		// для закрытия bottomsheet
		toggleBottomSheet();
	};

	return (
		<>
			<Box sx={{ '& > :not(:first-child)': { marginTop: '.5rem', gap: isSmallerThanMd ? '24px' : 'inherit' },
				width: '100%',
				backgroundColor:'white',
				padding: '.75rem 1rem 1rem 1rem',
				borderRadius: '1rem',
				border: '1px #4D4D4D',
			}}>
				<Box display='flex' alignItems="center" sx={{ gap:'.5rem',
					paddingY: isSmallerThanMd ? '0' : '.5rem',
					justifyContent: isSmallerThanMd ? 'center' : 'flex-start'
				}}>
					{isSmallerThanMd ? null : <FilterIcon style={{ width:'24px', height:'24px' }} />}
					<Typography sx={{ borderRadius: '48px',
						fontWeight: '700', fontSize:'1rem' }}>{localization[lang].MainCard.filter}</Typography>
				</Box>
				{isSmallerThanMd && <hr />}
				{/* Fields Section */}
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.field}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column',}}>
							<FilterSelect
								label={localization[lang].MainCard.query}
								value=""
								onChange={(value: string) => handleFieldClick(value)}
								options={translatedFields}
								onItemClick={(value: string) => {
									handleChange(value, selectedFields, setSelectedFields, "field");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedFields.map((value: string) => (
									<Chip key={value} label={value}
										  onClick={() => handleDeleteChipSpeciality(value)}
										  color="primary"
										  sx={{padding:"16px 7px",borderRadius:'8px'}}/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				{/* Scope of Activity Section */}
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.scopeOfActivity}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column',}}>
							<FilterSelect
								label={localization[lang].MainCard.query}
								value=""
								onChange={(value: string) => handleScopeClick(value)}
								options={translatedScopeOfActivities}
								onItemClick={(value: string) => {
									handleChange(value, selectedScopeOfActivities, setSelectedScopeOfActivities, "scope");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedScopeOfActivities.map((value: string) => (
									<Chip key={value} label={value}
										  onClick={() => handleDeleteChipScope(value)}
										  color="primary"
										  sx={{padding:"16px 7px",borderRadius:'8px'}}/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				{/*For Mobile&Tablet*/}
				{isSmallerThanMd  && (
					<Button variant='contained' sx={{ width:'100%', borderRadius: '40px' }} onClick={handleApply}>
						{localization[lang].MainCard.apply}
					</Button>
				)}
			</Box>
		</>
	);
};