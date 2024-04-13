import React, { useState, ChangeEvent } from 'react';
import {
	Box,
	MenuItem,
	MenuList,
	Slider,
	Input,
	Typography,
	InputBase,
	InputLabel,
	FormControl,
	Select,
	SelectChangeEvent,
	Accordion, AccordionSummary, AccordionDetails, Autocomplete, TextField, useMediaQuery,
} from "@mui/material";
import { styled } from '@mui/material/styles';
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
import {ReactComponent as FilterIcon} from '@src/assets/icons/Tuning 2.svg';
import {ReactComponent as ExpandMoreIcon} from '@src/assets/icons/expandmore.svg';


export const FilterSection: React.FC<IFilter> = (props) => {
	const { open, setOpen, filterAttributes, setFilterAttributes, triggerSearchFilters } = props;
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

		// Update the filterAttributes state
		setFilterAttributes(filterValues);
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
		console.log("New GPA value:", newValue);
		setSelectedGPA(newValue as number);
		filter("gpa", newValue as number);
	};

	const handleRating = (event: Event, newValue: number | number[]) => {
		setSelectedRating(newValue as number);
		filter("rating", newValue as number);
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


	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		'label + &': {
			backgroundColor:'#F8F8F8',
			borderRadius: '48px',

		},
		'label + & : focus':{
			borderRadius:'48px',
		},
		'label + & : active':{
			borderRadius:'48px',
		},
		'& .MuiInputBase-input': {
			padding:'0.75rem 20px',
			borderRadius:'48px',
			position: 'relative',
			backgroundColor:'#F8F8F8',
			border: 'none',
			fontSize: '14px',
			color:'#58607C',
			'&:focus': {
				borderRadius: '48px',
				color:'#58607C'
			},
		},
	}));

	const [age, setAge] = useState('');
	const [labelVisible, setLabelVisible] = useState(true);

	const handleAgeChange = (event: SelectChangeEvent<string>) => {
		const selectedValue = event.target.value || ''; // Добавляем проверку на null и undefined
		setAge(selectedValue);
		setLabelVisible(selectedValue === '' || selectedValue === 'None');
	};
	const handleButtonClick = (specialty: string) => {
		console.log(`Выбрана специальность: ${specialty}`);
		// Ваша логика для обработки выбора специальности
	};

	const isSmallerThanMd = useMediaQuery('(max-width:1380px)');

	return (
		<>
			<Box sx={{ '& > :not(:first-child)': { marginTop: '.5rem' } }}>
				<Box display='flex' alignItems="center" sx={{  gap:'.5rem', paddingY:'.5rem' }}>
					<FilterIcon style={{width:'24px', height:'24px',}}/>
					<Typography sx={{ borderRadius: '48px', fontWeight: '700', fontSize:'1rem' }}>{localization[lang].MainCard.filter}</Typography>
				</Box>

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
						<AccordionDetails sx={{ display: 'flex', justifyContent: 'center', width:'100%',padding: '0',}}>
							<FormControl variant='filled' size='small' sx={{ width: '100%', }}>
								<InputLabel
									id="demo-customized-select-label"
									shrink={false}
									sx={{ color:'#383838', fontSize:'14px', zIndex: 2,  opacity: labelVisible ? 1 : 0,'&.Mui-focused': {
											color: '#383838',
										},
										'&:focus-within': {
											color: '#383838',
										} }}
								>
									Введите запрос
								</InputLabel>
								<Select
									value={specialty}
									onChange={handleSpecialityChange}
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									input={<BootstrapInput />}
									IconComponent={ExpandMoreIcon}
									MenuProps={{
										sx: {
											'& .MuiPaper-root': {
												backgroundColor: '#FFF',
												borderRadius:'12px',
												boxShadow: '0px 24px 36px 0px rgba(207, 215, 226, 0.48)',
												strokeWidth: '1px',
												stroke: 'black',
												maxHeight: 200,
												maxWidth: 300,
											},
										},
									}}
								>
									<MenuItem value="" onClick={() => { handleChange('', selectedSpecialities, setSelectedSpecialities, "speciality");}} sx={{ fontSize:'14px', backgroundColor:'none' }}>None</MenuItem>
									{translatedSpecialities.map((speciality) => (
										<MenuItem
											key={speciality.id}
											value={speciality.name}
											sx={{fontSize:'14px'}}
											onClick={() => {
												handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities, "speciality");
											}}
										>
											{speciality.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>

						</AccordionDetails>
					</Accordion>
				</Box>

				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width:'100%',}}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%',}}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.region}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{padding:'0'}}>
							<FormControl variant='filled' size='small' sx={{ width: '100%', }}>
								<InputLabel
									id="demo-customized-select-label"
									shrink={false}
									sx={{ color:'#383838', fontSize:'14px', zIndex: 2,  opacity: labelVisible ? 1 : 0,'&.Mui-focused': {
											color: '#383838',
										},
										'&:focus-within': {
											color: '#383838',
										} }}
								>
									Введите запрос
								</InputLabel>
								<Select
									value={region}
									onChange={handleRegionChange}
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									input={<BootstrapInput />}
									IconComponent={ExpandMoreIcon}
									MenuProps={{
										sx: {
											'& .MuiPaper-root': {
												backgroundColor: '#FFF',
												borderRadius:'12px',
												boxShadow: '0px 24px 36px 0px rgba(207, 215, 226, 0.48)',
												strokeWidth: '1px',
												stroke: 'black',
												maxHeight: 200,
												maxWidth: 300,
											},
										},
									}}
								>
									<MenuItem sx={{ fontSize:'14px', backgroundColor:'none' }} value="" onClick={() => {handleChange('', selectedRegions, setSelectedRegions, "region");}}>
										<em>None</em>
									</MenuItem>
									{translatedRegions.map((region) => (
										<MenuItem
											sx={{ fontSize:'14px' }}
											key={region.id}
											value={region.name}
											onClick={() => {
												handleChange(region.name, selectedRegions, setSelectedRegions, "region");
											}}
										>
											{region.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Box display='flex' alignItems="center">
					<Accordion  defaultExpanded sx={{ boxShadow: 'none', width:'100%',}}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
							sx={{ padding: '0', display: 'flex', justifyContent: 'space-between', width: '100%',}}
						>
							<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{localization[lang].MainCard.university}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{padding:'0'}}>
							<FormControl variant='filled' size='small' sx={{ width: '100%', }}>
								<InputLabel
									id="demo-customized-select-label"
									shrink={false}
									sx={{ color:'#383838', fontSize:'14px', zIndex: 2,  opacity: labelVisible ? 1 : 0,'&.Mui-focused': {
											color: '#383838',
										},
										'&:focus-within': {
											color: '#383838',
										} }}
								>
									Введите запрос
								</InputLabel>
								<Select
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									value={age}
									onChange={handleAgeChange}
									input={<BootstrapInput />}
									IconComponent={ExpandMoreIcon}
									MenuProps={{
										sx: {
											'& .MuiPaper-root': {
												backgroundColor: '#FFF',
												borderRadius:'12px',
												boxShadow: '0px 24px 36px 0px rgba(207, 215, 226, 0.48)',
												strokeWidth: '1px',
												stroke: 'black',
												maxHeight: 200,
												maxWidth: 300,
											},
										},
									}}
								>
									<MenuItem sx={{fontSize:'14px'}} value="" onClick={() => {handleChange(0, selectedUniversityIDs, setSelectedUniversityIDs, "university_id");}}>
										<em>None</em>
									</MenuItem >
									{translatedUniversities.slice(0,5).map((university) => (
										<MenuItem
											sx={{fontSize:'14px'}}
											key={university.id}
											value={university.name}
											onClick={() => {
												handleChange(university.university_id, selectedUniversityIDs, setSelectedUniversityIDs, "university_id");
											}}
										>
											{university.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				</Box>

				<Box>
					<Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Средний GPA</Typography>
					<Slider
						getAriaLabel={() => 'GPA'}
						value={selectedGPA}
						onChange={handleGPA}
						max={4.0}
						min={1.0}
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
							value={selectedGPA}
							size="small"
							inputProps={{
								step: 0.1,
								min: 1.0,
								max: 4.0,
								type: 'number',
								'aria-labelledby': 'gpa-slider',
							}}
							sx={{
								'& input:focus': {
									outline: 'none',
								},
								'&.MuiInput-underline': {
									borderBottom: 'none !important',
								},

								'.MuiInputBase-input': {
									borderBottom: 'none !important',
									border: 'none',
									borderRadius: '13px',
									fontSize: '14px',
									padding: '4px 12px',
									textAlign: 'center',
									backgroundColor: '#629BF8',
									color:'white',
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
						getAriaLabel={() => 'Rating'}
						value={selectedRating}
						onChange={handleRating}
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
							value={selectedRating}
							size="small"
							inputProps={{
								step: 0.1,
								min: 1,
								max: 5,
								type: 'number',
								'aria-labelledby': 'rating-slider',
							}}

							sx={{
								'& input:focus': {
									outline: 'none',
								},
								'&.MuiInput-underline': {
									borderBottom: 'none !important',
								},

								'.MuiInputBase-input': {
									borderBottom: 'none !important',
									border: 'none',
									borderRadius: '13px',
									fontSize: '14px',
									padding: '4px 12px',
									textAlign: 'center',
									backgroundColor: '#629BF8',
									color:'white',
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


				<Box width='100%' display="flex" justifyContent="flex-end" className={styles.mobW100}>
					{isSmallerThanMd && (
						<Button variant='contained'
								className={styles.mobW100}
								sx={{ borderRadius: '40px' }}
								onClick={() => {
									if (filterAttributes.text.length ||
										filterAttributes.specialities.length ||
										filterAttributes.gpa !== 1 ||
										filterAttributes.year.length ||
										filterAttributes.degree.length ||
										filterAttributes.region.length) {
										setOpen(false);
										triggerSearchFilters(filterAttributes);
									}
									// handleChange(year.year, selectedYear, setSelectedYear);
								}}>
							{localization[lang].MainCard.apply}
						</Button>
					)}

				</Box>


			</Box>

		</>
	);
};