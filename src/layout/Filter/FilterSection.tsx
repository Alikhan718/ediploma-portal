import React from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { universities, regions, specialities, localization } from "@src/layout/Filter/generator";
import FilterSelect from "@src/components/FilterSelect/FilterSelect";
import FilterSlider from "@src/components/FilterSlider/FilterSlider";

export const FilterSection: React.FC<IFilter> = (props) => {
	const {filterAttributes, setFilterAttributes, triggerSearchFilters, toggleBottomSheet } = props;
	const [selectedSpecialities, setSelectedSpecialities] = React.useState<string[]>([]);
	const [selectedGPA, setSelectedGPA] = React.useState<number>(0);
	const [selectedRating, setSelectedRating] = React.useState<number>(0);
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
			filterValues.specialities = arr;
		}
		else if (type === "region") {
			filterValues.region = arr;
		}
		else if (type === "year"){
			filterValues.year = arr.join(",");
		}
		else if (type === "gpa"){
			filterValues.gpa = arr;
		}
		else if (type === "university_id"){
			filterValues.university_id = arr;
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

	const lang = useSelector(selectLanguage);
	const translatedSpecialities = specialities[lang];
	const translatedRegions = regions[lang];
	const translatedUniversities = universities[lang];

	const isSmallerThanMd = useMediaQuery('(max-width:1200px)');

	// Обновляем выбранные значения и вызываю функцию filter с обновленными значениями
	const handleChange = (e: any, arr: any, setE: any, type: string) => {
		const updatedValues = arr.includes(e) ? arr.filter((i: any) => i !== e) : [...arr, e];
		setE(updatedValues);

		filter(type, updatedValues);
	};

	const handleSpecialityClick = (value: string) => {
		const updatedSpecialities = selectedSpecialities.includes(value) ? selectedSpecialities.filter((sp: string) => sp !== value) : [...selectedSpecialities, value];
		setSelectedSpecialities(updatedSpecialities);

		filter("speciality", updatedSpecialities);
	};

	const handleRegionClick = (region: string) => {
		const updatedRegions = selectedRegions.includes(region) ? selectedRegions.filter((rg: string) => rg !== region) : [...selectedRegions, region];
		setSelectedRegions(updatedRegions);

		filter("region", updatedRegions);
	};
	const handleUniversityChipClick = (university_id: number) => {
		const updatedUniversityIDs = selectedUniversityIDs.includes(university_id)
			? selectedUniversityIDs.filter((id: number) => id !== university_id)
			: [...selectedUniversityIDs, university_id];
		setSelectedUniversityIDs(updatedUniversityIDs);

		filter("university_id", updatedUniversityIDs);
	};

	const handleDeleteChipSpeciality = (chipToDelete: string) => {
		const updatedSpecialities = selectedSpecialities.filter((speciality: string) => speciality !== chipToDelete);
		setSelectedSpecialities(updatedSpecialities);

		filter("speciality", updatedSpecialities);
	};
	const handleDeleteChipRegion = (chipToDelete: string) => {
		const updatedRegions = selectedRegions.filter((region: string) => region !== chipToDelete);
		setSelectedRegions(updatedRegions);

		filter("region", updatedRegions);
	};

	const handleSliderChange = (value: number) => {
		setSelectedGPA(value);

		filter('gpa', value);
	};
	const handleRatingChange = (value: number) => {
		setSelectedRating(value);

		filter('rating', value);
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
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column',}}>
							<FilterSelect
								label={localization[lang].MainCard.query}
								value=""
								onChange={(value: string) => handleSpecialityClick(value)}
								options={translatedSpecialities}
								onItemClick={(value: string) => {
									handleChange(value, selectedSpecialities, setSelectedSpecialities, "speciality");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedSpecialities.map((value: string) => (
									<Chip key={value} label={value}
										  onClick={() => handleDeleteChipSpeciality(value)}
										  color="primary"
										  sx={{padding:"16px 7px",borderRadius:'8px'}}
									/>
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
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',flexDirection: 'column',}}>
							<FilterSelect
								label={localization[lang].MainCard.query}
								value=""
								onChange={(value: string) => handleRegionClick(value)}
								options={translatedRegions}
								onItemClick={(value: string) => {
									handleChange(value, selectedRegions, setSelectedRegions, "region");
								}}
							/>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '10px', gap:'0.75rem',}}>
								{selectedRegions.map((value: string) => (
									<Chip key={value} label={value}
										  onClick={() => handleDeleteChipRegion(value)}
										  color="primary"
										  sx={{padding:"16px 7px",borderRadius:'8px'}}/>
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
										key={university.id} label={university.name} clickable
										onClick={() => handleUniversityChipClick(university.university_id)}
										color={selectedUniversityIDs.includes(university.university_id) ? "primary" : "default"}
										sx={{padding:"16px 7px",borderRadius:'8px'}}
									/>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				<FilterSlider
					label={localization[lang].MainCard.gpa}
					value={selectedGPA}
					onChange={handleSliderChange}
					min={1.0}
					max={4.0}
				/>
				<FilterSlider
					label={localization[lang].MainCard.rating}
					value={selectedRating}
					onChange={handleRatingChange}
					min={1.0}
					max={5.0}
				/>
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