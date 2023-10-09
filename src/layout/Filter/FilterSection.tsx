import React from 'react';
import { Box, Card, MenuItem, Slider, Typography } from "@mui/material";
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { ReactComponent as CloseIcon } from "@src/assets/icons/cross.svg";
import { degree, regions, specialities, years } from "@src/layout/Filter/generator";
import { Button } from "@src/components";
import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";
import cn from "classnames";
import { MultiSelect } from "@src/components/MultiSelect/MuiltiSelect";
import { useDispatch } from 'react-redux';
import { cancelFilters, fetchDiplomas } from "@src/store/diplomas/actionCreators";

export const FilterSection: React.FC<IFilter> = (props) => {
	const { open, setOpen, filterAttributes, setFilterAttributes, triggerSearchFilters } = props;
	const [selectedSpecialities, setSelectedSpecialities] = React.useState<string[]>([]);
	const [selectedGPA, setSelectedGPA] = React.useState(([1.0, 4.0]));
	const [selectedDegree, setSelectedDegree] = React.useState<string[]>([]);
	const [selectedYear, setSelectedYear] = React.useState<number[]>([]);
	const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
	const dispatch = useDispatch();
	React.useEffect(() => {
		const filterValues = {
			text: filterAttributes.text,
			specialities: selectedSpecialities.join(",") ?? filterAttributes.specialities,
			region: selectedRegions.join(",") ?? filterAttributes.region,
			degree: selectedDegree.join(",") ?? filterAttributes.degree,
			year: selectedYear.join(",") ?? filterAttributes.year,
			gpaL: selectedGPA[0] ?? filterAttributes.gpaL,
			gpaR: selectedGPA[1] ?? filterAttributes.gpaR,
		};

		// Update the filterAttributes state
		setFilterAttributes(filterValues);
		setFilterAttributes(filterValues);
		if (filterValues.text.length ||
			filterValues.specialities.length ||
			filterValues.gpaL !== 1 ||
			filterValues.gpaR !== 4 ||
			filterValues.year.length ||
			filterValues.degree.length ||
			filterValues.region.length) {
			triggerSearchFilters(filterValues);
		} else {
			dispatch(cancelFilters());
			dispatch(fetchDiplomas());
		}


	}, [selectedYear, selectedRegions, selectedSpecialities, selectedDegree, selectedGPA]);
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


	const handleChange = (e: any, arr: any, setE: any) => {
		setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [...arr, e]);
	};
	const handleDelete = (e: any, arr: any, setE: any) => {
		setE(arr.filter((i: any) => i != e));
	};

	const handleGPA = (event: Event, newValue: number | number[]) => {
		setSelectedGPA(newValue as number[]);
	};

	return (
		<>
			<Box display={open ? 'flex' : 'none'} width='70%' position='absolute' top='0' left="0" sx={{transform: "translate(25%, 12%)"}} justifyContent='center'
			>
				<Card elevation={6} sx={{
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
							Фильтр
						</Typography>
						<CloseIcon style={{ cursor: "pointer" }} onClick={() => {
							setOpen(false);
						}} />
					</Box>
					<Box display='flex' flexWrap='wrap' width='100%' height="25%" justifyContent='space-between'
						gap='2.5rem 0rem'>
						<Box width='48%' className={styles.mobW100}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								Специальности
							</Typography>
							<Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
								overflow="hidden scroll">
								{specialities.slice(0, 7).map((speciality) => (
									<Button
										variant='outlined'
										onClick={() => {
											handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities);
										}}
										className={cn(
											((selectedSpecialities.includes(speciality.name) ? 'active' : 'unactive') + 'Chip' + " customChip"),
											styles.mobPBtn,
											styles.mobTextSm
										)}
										key={speciality.id}
									>
										<Typography whiteSpace="normal" fontSize="16px" lineHeight="normal">
											{speciality.name}
										</Typography>
									</Button>
								))}
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
						<Box width='50%' className={styles.mobW100}
						>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								Регион
							</Typography>

							{/* <MultiSelect innerLabel="Список регионов" handleChange={setSelectedRegions} fullWidth>
								{regions.filter((el) => !filterAttributes.region.includes(el.name)).map((region) =>
									<MenuItem key={region.id} value={region.name}>{region.name}</MenuItem>
								)}
							</MultiSelect> */}
							<Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
								overflow="hidden scroll">
								{regions.slice(0, 7).map((region) =>
									<Button variant='outlined'
										onClick={() => {
											handleChange(region.name, selectedRegions, setSelectedRegions);
										}}
										className={cn(((selectedRegions.includes(region.name) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
										key={region.id}>
										<Typography whiteSpace="normal" fontSize="16px" lineHeight="normal"
											sx={{ color: "inherit !important" }}>
											{region.name}
										</Typography>
									</Button>)}
							</Box>
						</Box>
						<Box width='48%' className={styles.mobW100} sx={{ marginTop: '10px', marginBottom: '-50px' }}>
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
							/>
						</Box>
						<Box width='48%' className={styles.mobW100} sx={{ marginTop: '10px', marginBottom: '-50px' }}>
							<Typography fontSize='1.25rem' className={styles.mobTextMd} fontWeight="600">
								Год выпуска
							</Typography>
							<Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem'>
								{years.map((year) =>
									<Button variant='outlined'
										onClick={() => {
											handleChange(year.year, selectedYear, setSelectedYear);
										}}
										className={cn(((selectedYear.includes(year.year) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
										key={year.id}>
										{year.year}
									</Button>)}
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
								Применить
							</Button>

						</Box>

					</Box>
				</Card>
			</Box>


		</>
	);
};
