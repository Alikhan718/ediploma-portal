import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

import { options } from './generator';
import { ISettingPageLayout } from './types';
import { SettingsPageHeader } from './components';
import { Button, Input, Modal } from '@src/components';
import { selectTime } from "@src/store/settings/selector";
import { fetchTime, updatePickupTime } from "@src/store/settings/reducer";
import { selectCurrentLocation } from "@src/store/locations/selector";


export const TimeSettingPage: React.FC<ISettingPageLayout> = (props) => {
	const dispatch = useDispatch();
	const time = useSelector(selectTime);
	const rest_id = useSelector(selectCurrentLocation);

	const [selectedValue, setSelectedValue] = React.useState(time ?? 0);
	const [open, setOpen] = React.useState(false);
	const [show, setValueShow] = React.useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (options.includes(Number(event.target.value))) {
			setValueShow(false);
		} else {
			event.target.value = String(Math.max(0, Number(event.target.value)));
			if (Number(event.target.value) > 60) {
				event.target.value = String(60);
				setValueShow(false);
			}
			else {
				setValueShow(true);
			}
		}
		setSelectedValue(Number(event.target.value));
	};

	const getTime = (): void => {
		dispatch(fetchTime(rest_id));
	};

	const updateTime = (): void => {
		dispatch(updatePickupTime(rest_id, selectedValue));
		setOpen(false);
	};

	React.useEffect(getTime, [rest_id]);
	React.useEffect(() => {
		if (options.includes(time)) {
			setValueShow(false);
		} else {
			setValueShow(true);
		}
		setSelectedValue(time);

	}, [time]);


	return (
		<React.Fragment>
			<SettingsPageHeader />
			<Modal open={open} maxWidth={350} handleClose={() => setOpen(false)}>
				{/* IF MODAL MODE IS FALSE THEN shouldn't render  */}
				<div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
					<Typography variant='h4' fontWeight='600' mb='8px'> {'Настройка времени'} </Typography>
				</div>
				<div style={{ display: "flex", textAlign: "center", marginBottom: "2rem" }}>
					<Typography variant='h4'
						mb='8px'> {'Подтвердите изменение времени готовки на ' + selectedValue + ' мин.'} </Typography>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Button variant={'text'} onClick={() => setOpen(false)}>Назад</Button>
					<Button variant='contained' onClick={() => updateTime()} color='primary'>Подтвердить</Button>
				</div>
			</Modal>
			<div style={{ marginBottom: "2rem" }} />
			<Typography variant='h4' fontWeight='600' mb='8px'> {'Минимальное время готовки'} </Typography>

			<RadioGroup
				row={false}
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
			>
				<FormControlLabel value="25"
					control={<Radio checked={selectedValue == 25} onChange={handleChange} color="success" />}
					label="25 мин." />
				<FormControlLabel value="40"
					control={<Radio checked={selectedValue == 40} onChange={handleChange} color="success" />}
					label="40 мин." />
				<FormControlLabel value="60"
					control={<Radio checked={selectedValue == 60} onChange={handleChange} color="success" />}
					label="60 мин." />
				<FormControlLabel value=""
					control={<Radio id='time-input' checked={![25, 40, 60].includes(selectedValue)}
						onChange={handleChange} color="success" />}
					label="Выбрать свое время" />
				<div style={{ width: "25rem", marginTop: '1rem', display: show ? "block" : "none" }}>
					<Input type='number' label={'Задайте свое время, мин.'} onChange={handleChange}
						fullWidth={true} value={options.includes(selectedValue) ? "" : selectedValue} inputSize='s'></Input>
				</div>
			</RadioGroup>
			<Button
				onClick={() => setOpen(true)}
				size="small"
				variant='contained'
				color='primary'
				sx={{ marginTop: '40px', backgroundColor: '#025F3E', '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}>
				Сохранить
			</Button>

		</React.Fragment>
	);
};
