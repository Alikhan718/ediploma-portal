import React from 'react';
import { Box, Card, MenuItem, Slider, Typography, InputLabel, FormControl, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@src/components";
import { IFilter } from "@src/layout/Filter/FilterSection.props";
import { ReactComponent as CloseIcon } from "@src/assets/icons/cross.svg";
import { fields, localization } from "@src/layout/Filter/generator";
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '@src/store/generals/selectors';
import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";
import { cancelEmployerFilters, fetchEmployersList } from '@src/store/auth/actionCreators';

export const EmployerFilter: React.FC<IFilter> = (props) => {
	const {filterAttributes, setFilterAttributes, triggerSearchFilters } = props;

    const dispatch = useDispatch()
    const lang = useSelector(selectLanguage);
    const translatedFields = fields[lang];
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			},
		},
	};
	
    const [field, setField] = React.useState("");
    const [selectedField, setSelectedField] = React.useState([]);

    const handleFieldChange = (event: SelectChangeEvent) => {
        setField(event.target.value);
    };

    const handleChange = (e: any, arr: any, setE: any, type: string) => {
		setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [e]);
		if (!arr.includes(e)){
			filter(type, [e]);
		}
		else{
			filter(type, []);
		}
	};

    const filter = (type:string, arr: any) => {

		let filterValues = {
            text: filterAttributes.text,
			field: selectedField.join(",") ?? filterAttributes.field,
		};

		if (type === "field") {
			filterValues.field = arr.join(",");
		}

		// Update the filterAttributes state
		setFilterAttributes(filterValues);
		if (filterValues.field.length ) {
			triggerSearchFilters(filterValues);
		} else {
			dispatch(cancelEmployerFilters());
			dispatch(fetchEmployersList());
		}
	};

	return (
		<>
			<Box id='centeredBox'
				justifyContent='center'
				style={{
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
								<FormControl fullWidth>
									<Select
										value={field}
										onChange={handleFieldChange}
										sx={{borderRadius: "2rem"}}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
										MenuProps={MenuProps}
									>
										<MenuItem 
											value="" 
											onClick={() => {
												handleChange('', selectedField, setSelectedField, "field");
											}}
										>
											<em>None</em>
										</MenuItem>
										{translatedFields.map((field) => (
											<MenuItem 
												key={field.id} 
												value={field.name}
												onClick={() => {
													handleChange(field.name, selectedField, setSelectedField, "field");
												}}
											>
												{field.name}
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
									if (filterAttributes.field.length) {
										triggerSearchFilters(filterAttributes);
									}
								}}>
								{localization[lang].MainCard.apply}
							</Button>
						</Box>
					</Box>
				</Card>
			</Box>
		</>
	);
};