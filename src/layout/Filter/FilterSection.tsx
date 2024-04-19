import React, {useEffect, useState} from 'react';
import {
	Button,
	Box,
	Typography,
	Chip,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { cancelFilters, fetchDiplomas } from "@src/store/diplomas/actionCreators";
import { selectLanguage } from "@src/store/generals/selectors";
import { ReactComponent as FilterIcon } from '@src/assets/icons/Tuning 2.svg';
import { ReactComponent as ExpandMoreIcon } from '@src/assets/icons/expandmore.svg';
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { universities, regions, specialities, years, localization } from "@src/layout/Filter/generator";
import FilterSelect from "@src/components/FilterSelect/FilterSelect";
import FilterSlider from "@src/components/FilterSlider/FilterSlider";

export const FilterSection: React.FC<IFilter> = (props) => {
	const {filterAttributes, setFilterAttributes, triggerSearchFilters } = props;
	const [selectedSpecialities, setSelectedSpecialities] = React.useState<string[]>([]);
	const [selectedGPA, setSelectedGPA] = React.useState<number>(1.0);
	const [selectedRating, setSelectedRating] = React.useState<number>(1.0);
	const [selectedDegree, setSelectedDegree] = React.useState<string[]>([]);
	const [selectedYear, setSelectedYear] = React.useState<number[]>([]);
	const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
	const [selectedUniversityIDs, setSelectedUniversityIDs] = React.useState<number[]>([]);
	const dispatch = useDispatch();

	const filter = (type:string, arr: any) => {

		let filterValues = {
			text: filterAttributes.text,
			specialities: selectedSpecialities.join(",") ?? filterAttributes.specialities,
			region: selectedRegions.join(",") ?? filterAttributes.region,
			degree: selectedDegree.join(",") ?? filterAttributes.degree,
			year: selectedYear.join(",") ?? filterAttributes.year,
			gpa: selectedGPA ?? filterAttributes.gpa,
			university_id: selectedUniversityIDs[0] ?? filterAttributes.university_id,
			rating : selectedRating ?? filterAttributes.rating,
		};

		if (type === "speciality") {
			filterValues.specialities = arr.join(",");
		}
		else if (type === "region") {
			filterValues.region = arr.join(",");
		}
		else if (type === "year"){
			filterValues.year = arr.join(",");
		}
		else if (type === "gpa"){
			filterValues.gpa = arr;

		}
		else if (type === "university_id"){
			filterValues.university_id = arr[0];
		}
		else if (type === "rating"){
			filterValues.rating = arr;
		}

		setFilterAttributes(filterValues);

		if (filterValues.text.length ||
			filterValues.specialities.length ||
			filterValues.gpa ||
			filterValues.year.length ||
			filterValues.university_id !== 0 ||
			filterValues.degree.length ||
			filterValues.region.length ||
			filterValues.rating ) {
			triggerSearchFilters(filterValues);
		} else {
			dispatch(cancelFilters());
			dispatch(fetchDiplomas());
		}
	};

	const marks = [
		{
			value: 0,
			label: '1',
		},

		{
			value: 100,
			label: '4',
		},
	];

	const lang = useSelector(selectLanguage);
	const translatedSpecialities = specialities[lang];
	const translatedRegions = regions[lang];
	const translatedUniversities = universities[lang];

	const [region, setRegion] = React.useState('');
	const [speciality, setSpeciality] = React.useState<string>('');
	const [university, setUniversity] = React.useState('');

	const handleChange = (e: any, arr: any, setE: any, type: string) => {
		setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [e]);
		if (!arr.includes(e)){
			filter(type, [e]);
		}
		else{
			filter(type, []);
		}
	};
	const handleDeleteChipSpeciality = (chipToDelete: string) => {
		setSelectedSpecialities((prevSpecialities: string[]) =>
			prevSpecialities.filter((speciality: string) => speciality !== chipToDelete)
		);
	};

	const handleDeleteChipRegion = (chipToDelete: string) => {
		setSelectedRegions((prevRegions: string[]) =>
			prevRegions.filter((region: string) => region !== chipToDelete)
		);
	};

	const handleSpecialityClick = (value: string) => {
		// Обрабатываем каждый выбранный элемент отдельно
		const updatedSpecialities = selectedSpecialities.includes(value)
			? selectedSpecialities.filter((sp: string) => sp !== value)
			: [...selectedSpecialities, value];
		setSelectedSpecialities(updatedSpecialities);
		setFilterAttributes({ ...filterAttributes, specialities: updatedSpecialities.join(',') });
	};

	const handleRegionClick = (region: string) => {
		const updatedRegions = selectedRegions.includes(region) // Используйте аргумент region, а не неопределенную переменную value
			? selectedRegions.filter((rg: string) => rg !== region)
			: [...selectedRegions, region];
		setSelectedRegions(updatedRegions);
		setFilterAttributes({ ...filterAttributes, region: updatedRegions.join(',') });
	};

	const handleSliderChange = (value: number) => {
		setSelectedGPA(value);
		setFilterAttributes({ ...filterAttributes, gpa: value });
	};
	const handleRatingChange = (value: number) => {
		setSelectedRating(value);
		setFilterAttributes({ ...filterAttributes, rating: value });
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			},
		},
	};

	const isSmallerThanMd = useMediaQuery('(max-width:1380px)');

	return (
		<>
			<Box sx={{ '& > :not(:first-child)': { marginTop: '.5rem', gap: isSmallerThanMd ? '24px' : 'inherit' }  }}>
				<Box display='flex' alignItems="center" sx={{ gap:'.5rem', paddingY:'.5rem', justifyContent: isSmallerThanMd ? 'center' : 'flex-start' }}>
					{isSmallerThanMd ? null : <FilterIcon style={{ width:'24px', height:'24px' }} />}
					<Typography sx={{ borderRadius: '48px', fontWeight: '700', fontSize:'1rem' }}>{localization[lang].MainCard.filter}</Typography>
				</Box>
				{/* Speciality Section */}
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.speciality}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column', gap:'12px'}}>
							<FilterSelect
								label="Введите запрос"
								value=""
								onChange={(value: string) => handleSpecialityClick(value)}
								options={translatedSpecialities}
								onItemClick={(value: string) => {
									handleChange(value, selectedSpecialities, setSelectedSpecialities, "speciality");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedSpecialities.map((value: string) => (
									<Chip key={value} label={value} onClick={() => handleDeleteChipSpeciality(value)} color="primary" sx={{padding:"16px 7px",borderRadius:'8px'}}/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				{/* Region Section */}
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.region}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column', gap:'12px'}}>
							<FilterSelect
								label="Введите запрос"
								value=""
								onChange={(value: string) => handleRegionClick(value)}
								options={translatedRegions}
								onItemClick={(value: string) => {
									handleChange(value, selectedRegions, setSelectedRegions, "region");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedRegions.map((value: string) => (
									<Chip key={value} label={value} onClick={() => handleDeleteChipRegion(value)} color="primary" sx={{padding:"16px 7px",borderRadius:'8px'}}/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				{/* University Section */}
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.university}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column', gap:'12px'}}>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{translatedUniversities.map((university) => (
									<Chip
										key={university.id}
										label={university.name}
										clickable
										onClick={() => {
											handleChange(university.university_id, selectedUniversityIDs, setSelectedUniversityIDs, "university_id");
										}}
										color={selectedUniversityIDs.includes(university.university_id) ? "primary" : "default"}
										sx={{padding:"16px 7px",borderRadius:'8px'}}
									/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				<FilterSlider
					label="GPA"
					value={selectedGPA}
					onChange={handleSliderChange}
					min={1.0}
					max={4.0}
				/>
				<FilterSlider
					label="Rating"
					value={selectedRating}
					onChange={handleRatingChange}
					min={1.0}
					max={5.0}
				/>
				{/*For Mobile&Tablet*/}
				{isSmallerThanMd  && (
					<Button variant='contained' sx={{ width:'100%', borderRadius: '40px' }} onClick={() => {
						if (filterAttributes.text.length ||
							filterAttributes.specialities.length ||
							filterAttributes.gpa ||
							filterAttributes.university.length ||
							filterAttributes.rating ||
							filterAttributes.region.length) {
							triggerSearchFilters(filterAttributes);
						}

						// handleChange(year.year, selectedYear, setSelectedYear);
					}}>
						{localization[lang].MainCard.apply}
					</Button>
				)}
			</Box>
		</>
	);
};