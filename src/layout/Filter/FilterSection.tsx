import React from 'react';
import { Box, Card, MenuItem, Slider, Typography, InputLabel, FormControl, Select, SelectChangeEvent } from "@mui/material";
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { ReactComponent as CloseIcon } from "@src/assets/icons/cross.svg";
import { universities, regions, specialities, years, localization } from "@src/layout/Filter/generator";
import { Button } from "@src/components";
import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { cancelFilters, fetchDiplomas } from "@src/store/diplomas/actionCreators";
import { selectLanguage } from "@src/store/generals/selectors";


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

	return (
		<>
			<Box id='centeredBox'
				justifyContent='center'
				style={{
					display: open ? 'flex' : 'none',
					position: 'fixed',
					width: '70%',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				sx={{
					zIndex: "10",
					'@media (max-width: 1000px)': {
						transform: "translate(5vw, 10vh)",
						width: "90%"
					}
				}}>
				< Card elevation={6} sx={{
					width: "100%",
					borderRadius: "1rem",
					padding: "1.5rem 1.5rem",
					gap: "1rem",
					display: "flex",
					flexDirection: "column", backgroundColor: "white",
				}}
					className={styles.mobP15}>
					<Box display='flex' justifyContent='space-between'>
						<Typography
							fontSize='1.5rem'
							fontWeight='600'
							className={styles.mobTextMd}
						>
							{localization[lang].MainCard.filter}
						</Typography>
						<CloseIcon style={{ cursor: "pointer" }} onClick={() => {
							setOpen(false);
						}} />
					</Box>
					<Box display='flex' flexWrap='wrap' width='100%' height="25%" justifyContent='space-between'
						gap='2.5rem 0rem'>
						<Box width='48%' className={styles.mobW100}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								{localization[lang].MainCard.speciality}
							</Typography>
							<Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
								overflow="hidden scroll" sx={{

								}}>
								{/* {translatedSpecialities.slice(0, 5).map((speciality) => (
									<Button
										variant='outlined'
										onClick={() => {
											handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities, "speciality");
										}}
										className={cn(
											((selectedSpecialities.includes(speciality.name) ? 'active' : 'unactive') + 'Chip' + " customChip"),
											styles.mobPBtn,
											styles.mobTextSm
										)}
										key={speciality.id}
									>
										<Typography whiteSpace="normal" fontSize="16px" lineHeight="normal" sx={{
											'@media (max-width: 1000px)': {
												fontSize: '0.9rem'
											}
										}}>
											{speciality.name}
										</Typography>
									</Button>
								))} */}
								<FormControl fullWidth>
									<Select
										value={specialty}
										onChange={handleSpecialityChange}
										sx={{borderRadius: "2rem"}}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
										MenuProps={MenuProps}
									>
										<MenuItem 
											value="" 
											onClick={() => {
												handleChange('', selectedSpecialities, setSelectedSpecialities, "speciality");
											}}
										>
											<em>None</em>
										</MenuItem>
										{translatedSpecialities.map((speciality) => (
											<MenuItem 
												key={speciality.id} 
												value={speciality.name}
												onClick={() => {
													handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities, "speciality");
												}}
											>
												{speciality.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</Box>

						{/* <Box width='48%' className={styles.mobW100}
						>
							<Typography fontSize='1.25rem' className={styles.mobTextMd}>
								Уровень образования
							</Typography>
							<MultiSelect innerLabel="Список уровней" handleChange={setSelectedDegree} fullWidth>
								{degree.filter((el) => !filterAttributes.degree.includes(el.name)).map((degree) =>
									<MenuItem key={degree.id} value={degree.name}>{degree.name}</MenuItem>
								)}
							</MultiSelect>
						</Box> */}
						<Box width='50%' className={styles.mobW100}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								{localization[lang].MainCard.region}
							</Typography>

							{/* <MultiSelect innerLabel="Список регионов" handleChange={setSelectedRegions} fullWidth>
								{regions.filter((el) => !filterAttributes.region.includes(el.name)).map((region) =>
									<MenuItem key={region.id} value={region.name}>{region.name}</MenuItem>
								)}
							</MultiSelect> */}
							<Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
								overflow="hidden scroll" sx={{
									'@media (max-width: 1000px)': {
										gap: '.2rem'
									}
								}}>
								{/* {translatedRegions.slice(0, 7).map((region) =>
									<Button variant='outlined'
										onClick={() => {
											handleChange(region.name, selectedRegions, setSelectedRegions, "region");
										}}
										className={cn(((selectedRegions.includes(region.name) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
										key={region.id}>
										<Typography whiteSpace="normal" fontSize="16px" lineHeight="normal"
											sx={{
												color: "inherit !important", '@media (max-width: 1000px)': {
													fontSize: '0.9rem'
												}
											}}>
											{region.name}
										</Typography>
									</Button>)} */}
									<FormControl fullWidth >
										<Select
											sx={{borderRadius: "2rem"}}
											value={region}
											onChange={handleRegionChange}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											MenuProps={MenuProps}
										>
											<MenuItem value="" onClick={() => {handleChange('', selectedRegions, setSelectedRegions, "region");}}>
												<em>None</em>
											</MenuItem>
											{translatedRegions.map((region) => (
												<MenuItem 
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
							</Box>
						</Box>
						<Box width='44%' className={styles.mobW100}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								GPA
							</Typography>
							<Slider
								max={4.0}
								min={1.0}
								step={0.1}
								getAriaLabel={() => 'GPA'}
								value={selectedGPA}
								onChange={handleGPA}
								valueLabelDisplay="auto"
								sx={{marginLeft: "1rem"}}
							/>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600" marginTop="1rem">
								Rating
							</Typography>
							<Slider
								max={5.0}
								min={0.0}
								step={0.1}
								getAriaLabel={() => 'Rating'}
								value={selectedRating}
								onChange={handleRating}
								valueLabelDisplay="auto"
								sx={{marginLeft: "1rem"}}
							/>
						</Box>
						
						{/* <Box width='48%' className={styles.mobW100} sx={{ marginTop: '10px', marginBottom: '-50px' }}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								{localization[lang].MainCard.year}
							</Typography>
							<Box display='flex' gap='.5rem' flexWrap='wrap' my='1rem' >
								{years.map((year) =>
									<Button variant='outlined'
										onClick={() => {
											handleChange(year.year, selectedYear, setSelectedYear, "year");
										}}
										className={cn(((selectedYear.includes(year.year) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
										key={year.id}>
										{year.year}
									</Button>)}
							</Box>

						</Box> */}
						<Box width='50%' className={styles.mobW100}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								{localization[lang].MainCard.university}
							</Typography>
							<Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
								overflow="hidden scroll" sx={{
									'@media (max-width: 1000px)': {
										gap: '.2rem'
									}
								}}
							>
								<FormControl fullWidth >
									<Select
										sx={{borderRadius: "2rem"}}
										value={university}
										onChange={handleUniversityChange}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
									>
										<MenuItem value="" onClick={() => {handleChange(0, selectedUniversityIDs, setSelectedUniversityIDs, "university_id");}}>
											<em>None</em>
										</MenuItem>
										{translatedUniversities.slice(0,5).map((university) => (
											<MenuItem 
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
							</Box>

						</Box>

						<Box width='100%' display="flex" justifyContent="flex-end" className={styles.mobW100}>
							<Button variant='contained'
								className={styles.mobW100}
								sx={{ borderRadius: '40px' }}
								onClick={() => {
									if (filterAttributes.text.length ||
										filterAttributes.specialities.length ||
										filterAttributes.gpaL !== 1 ||
										filterAttributes.gpaR !== 4 ||
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

						</Box>

					</Box>
				</Card>
			</Box>


		</>
	)
		;
};