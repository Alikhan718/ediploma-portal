import React from 'react';
import {
	Box,
	Card,
	MenuItem,
	Slider,
	Input,
	Typography,
	InputLabel,
	FormControl,
	Select,
	SelectChangeEvent,
	Accordion, AccordionSummary, AccordionDetails, Autocomplete, TextField, Grid
} from "@mui/material";
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { ReactComponent as CloseIcon } from "@src/assets/icons/cross.svg";
import { universities, regions, specialities, years, localization } from "@src/layout/Filter/generator";
import { Button } from "@src/components";
import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";
import cn from "classnames";
import { MultiSelect } from "@src/components/MultiSelect/MuiltiSelect";
import { useDispatch, useSelector } from 'react-redux';
import { cancelFilters, fetchDiplomas } from "@src/store/diplomas/actionCreators";
import { selectLanguage } from "@src/store/generals/selectors";
import e from 'express';
import { set } from 'react-ga';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ReactComponent as FilterIcon} from '@src/assets/icons/Tuning 2.svg';



export const FilterSection: React.FC<IFilter> = (props) => {
	const { open, setOpen, filterAttributes, setFilterAttributes, triggerSearchFilters } = props;
	const [selectedSpecialities, setSelectedSpecialities] = React.useState<string[]>([]);
	const [selectedGPA, setSelectedGPA] = React.useState(([1.0, 4.0]));
	const [selectedRating, setSelectedRating] = React.useState<number[]>([0.0, 5.0]);
	const [selectedDegree, setSelectedDegree] = React.useState<string[]>([]);
	const [selectedYear, setSelectedYear] = React.useState<number[]>([]);
	const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
	const [selectedUniversityIDs, setSelectedUniversityIDs] = React.useState<number[]>([]);
	const dispatch = useDispatch();
	// React.useEffect(() => {
	// 	const filterValues = {
	// 		text: filterAttributes.text,
	// 		specialities: selectedSpecialities.join(",") ?? filterAttributes.specialities,
	// 		region: selectedRegions.join(",") ?? filterAttributes.region,
	// 		degree: selectedDegree.join(",") ?? filterAttributes.degree,
	// 		year: selectedYear.join(",") ?? filterAttributes.year,
	// 		gpaL: selectedGPA[0] ?? filterAttributes.gpaL,
	// 		gpaR: selectedGPA[1] ?? filterAttributes.gpaR,
	// 	};

	// 	// Update the filterAttributes state
	// 	setFilterAttributes(filterValues);
	// 	setFilterAttributes(filterValues);
	// 	if (filterValues.text.length ||
	// 		filterValues.specialities.length ||
	// 		filterValues.gpaL !== 1 ||
	// 		filterValues.gpaR !== 4 ||
	// 		filterValues.year.length ||
	// 		filterValues.degree.length ||
	// 		filterValues.region.length) {
	// 		triggerSearchFilters(filterValues);
	// 	} else {
	// 		dispatch(cancelFilters());
	// 		dispatch(fetchDiplomas());
	// 	}


	// }, [selectedYear, selectedRegions, selectedSpecialities, selectedDegree, selectedGPA]);

	const filter = (type:string, arr: any) => {

		let filterValues = {
			text: filterAttributes.text,
			specialities: selectedSpecialities.join(",") ?? filterAttributes.specialities,
			region: selectedRegions.join(",") ?? filterAttributes.region,
			degree: selectedDegree.join(",") ?? filterAttributes.degree,
			year: selectedYear.join(",") ?? filterAttributes.year,
			gpaL: selectedGPA[0] ?? filterAttributes.gpaL,
			gpaR: selectedGPA[1] ?? filterAttributes.gpaR,
			university_id: selectedUniversityIDs[0] ?? filterAttributes.university_id,
			ratingL : selectedRating[0] ?? filterAttributes.ratingL,
			ratingR : selectedRating[1] ?? filterAttributes.ratingR,
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
			filterValues.gpaL = arr[0];
			filterValues.gpaR = arr[1];
		}
		else if (type === "university_id"){
			filterValues.university_id = arr[0];
		}
		else if (type === "rating"){
			filterValues.ratingL = arr[0];
			filterValues.ratingR = arr[1];
		}

		// Update the filterAttributes state
		setFilterAttributes(filterValues);
		setFilterAttributes(filterValues);
		if (filterValues.text.length ||
			filterValues.specialities.length ||
			filterValues.gpaL !== 1 ||
			filterValues.gpaR !== 4 ||
			filterValues.year.length ||
			filterValues.university_id !== 0 ||
			filterValues.degree.length ||
			filterValues.region.length ||
			filterValues.ratingL !== 0 ||
			filterValues.ratingR !== 5) {
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


	const handleChange = (e: any, arr: any, setE: any, type: string) => {
		setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [e]);
		if (!arr.includes(e)){
			filter(type, [e]);
		}
		else{
			filter(type, []);
		}
	};
	const handleDelete = (e: any, arr: any, setE: any) => {
		setE(arr.filter((i: any) => i != e));
	};

	const handleGPA = (event: Event, newValue: number | number[]) => {
		setSelectedGPA(newValue as number[]);
		filter("gpa", newValue);
	};
	
	const handleRating = (event: Event, newValue: number | number[]) => {
		setSelectedRating(newValue as number[]);
		filter("rating", newValue);
	}
	const lang = useSelector(selectLanguage);
	const translatedSpecialities = specialities[lang];
	const translatedRegions = regions[lang];
	const translatedUniversities = universities[lang];

	const [region, setRegion] = React.useState('');
	const [specialty, setSpeciality] = React.useState('');
	const [university, setUniversity] = React.useState('');

	const handleRegionChange = (event: SelectChangeEvent) => {
		setRegion(event.target.value as string);
	};

	const handleSpecialityChange = (event: SelectChangeEvent) => {
		setSpeciality(event.target.value as string);
	};

	const handleUniversityChange = (event: SelectChangeEvent) => {
		setUniversity(event.target.value as string);
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
	const options = ['Option 1', 'Option 2'];

	const [value, setValue] = React.useState(1);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value === '' ? 0 : Number(event.target.value));
	};



	const [value2, setValue2] = React.useState(1);

	const handleSliderChange2 = (event: Event, newValue: number | number[]) => {
		setValue2(newValue as number);
	};

	const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue2(event.target.value === '' ? 0 : Number(event.target.value));
	};



	return (
		<>
			<Box sx={{ '& > :not(:first-child)': { marginTop: '.5rem' } }}>
				<Box display='flex' alignItems="center" sx={{  gap:'.5rem', paddingY:'.5rem' }}>
					<FilterIcon style={{width:'24px', height:'24px',}}/>
					<Typography sx={{ borderRadius: '48px', fontWeight: '700', fontSize:'1rem' }}>Фильтр</Typography>
				</Box>

				<Box display='flex' alignItems="center" justifyContent='space-between'>
					<Accordion sx={{ boxShadow: 'none', }} >
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{  display:'flex', alignItems:"center", justifyContent:'space-between', padding:'0',}}
						>
							<Typography  sx={{ fontSize: '1rem', fontWeight: 700 }}>Специальности</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Autocomplete
								id="controllable-states-demo"
								options={options}
								renderInput={(params) => <TextField {...params} label="Controllable" />}
							/>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Box display='flex' alignItems="center" justifyContent='space-between'>
					<Accordion sx={{ boxShadow: 'none', }} >
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{  display:'flex', alignItems:"center", justifyContent:'space-between',padding:'0',}}
						>
							<Typography  sx={{ fontSize: '1rem', fontWeight: 700 }}>Регион</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Autocomplete
								id="controllable-states-demo"
								options={options}
								renderInput={(params) => <TextField {...params} label="Controllable" />}
							/>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Box display='flex' alignItems="center" justifyContent='space-between'>
					<Accordion sx={{ boxShadow: 'none', }} >
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{  display:'flex', alignItems:"center", justifyContent:'space-between',boxSizing: 'none',padding:'0',}}
						>
							<Typography  sx={{ fontSize: '1rem', fontWeight: 700 }}>Университет</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Autocomplete
								id="controllable-states-demo"
								options={options}
								renderInput={(params) => <TextField {...params} label="Controllable" />}
							/>
						</AccordionDetails>
					</Accordion>
				</Box>

				<Box>
					<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Средний GPA</Typography>
					<Slider
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="gpa-slider"
						min={1}
						max={4}
						step={0.1}
						sx={{
							'& .MuiSlider-thumb': {
								width: '10px',
								height: '22px',
								borderRadius: '64px',
								border: '1px solid #D8E6FD',
								background: 'white',
							},
							'& .MuiSlider-rail': {
								borderRadius: '32px',
								height: '8px',
								background: '#F8F8F8',
							},
							'& .MuiSlider-track': {
								borderRadius: '32px',
								height: '8px',
								background: 'linear-gradient(to right, #3B82F6, #3B82F6)',
							},
						}}
					/>

					<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>1.0</Typography>
						<Input
							value={value}
							size="small"
							onChange={handleInputChange}
							inputProps={{
								step: 0.1,
								min: 1,
								max: 4,
								type: 'number',
								'aria-labelledby': 'gpa-slider',
							}}
							sx={{
								display:'flex',
								justifyContent: 'center',
								alignItems:'center',


								'.MuiInputBase-input': {
									border: 'none',
									borderRadius: '13px',
									fontSize:'1rem',
									padding: '0px',
								},
								'& .MuiInputBase-input::after': {
									border: 'none',
								},

								'input[type=number]': {
									'-moz-appearance': 'textfield',
									'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
										'-webkit-appearance': 'none',
										margin: 0,
									},
									'&::after': {
										borderBottom: 'none',
									},
								},


							}}
						/>
						<Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>4.0</Typography>
					</Box>
				</Box>


				<Box>
					<Typography  sx={{ fontSize: '1rem', fontWeight: 700 }}>Рейтинг</Typography>
					<Slider
						value={typeof value2 === 'number' ? value2 : 0}
						onChange={handleSliderChange2}
						aria-labelledby="rating-slider"
						min={1}
						max={5}
						step={0.1}
						sx={{
							'& .MuiSlider-thumb': {
								width: '9.976px',
								height: '21.948px',
								borderRadius: '64px',
								border: '1px solid #D8E6FD',
								background: 'white',
							},
							'& .MuiSlider-rail': {
								borderRadius: '32px',
								height: '8px',
								background: '#F8F8F8',
							},
							'& .MuiSlider-track': {
								borderRadius: '32px',
								height: '8px',
								background: 'linear-gradient(to right, #3B82F6, #3B82F6)',
							},
						}}
					/>

					<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>1.0</Typography>
						<Input
							value={value2}
							size="small"
							onChange={handleInputChange2}
							inputProps={{
								step: 0.1,
								min: 1,
								max: 5,
								type: 'number',
								'aria-labelledby': 'rating-slider',
							}}

							sx={{
								display:'flex',
								justifyContent: 'center',
								alignItems:'center',


								'.MuiInputBase-input': {
									border: 'none',
									borderRadius: '13px',
									fontSize:'1rem',
									padding: '0px',
								},
								'& .MuiInputBase-input::after': {
									border: 'none',
								},

								'input[type=number]': {
									'-moz-appearance': 'textfield',
									'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
										'-webkit-appearance': 'none',
										margin: 0,
									},
									'&::after': {
										borderBottom: 'none',
									},
								},


							}}
						/>
						<Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>5.0</Typography>
					</Box>
				</Box>

			</Box>




		</>
	)
		;
};