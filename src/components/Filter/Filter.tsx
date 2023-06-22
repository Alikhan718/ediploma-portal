import React from 'react';
import { Box, Typography } from '@mui/material';
import { Switch, Input, Button } from '@src/components';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/filter.svg';
import { FilterProps } from './Filter.props';


export const Filter: React.FC<FilterProps> = (props) => {
	const { title, onOpen, search, setSearch, only_active, setOnlyActive } = props;
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch ? setSearch(e.target.value) : null;
	};
	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setOnlyActive && setOnlyActive(e.target.checked);
	};

	return (
		<Box width='100%' display='flex' alignItems='center' justifyContent='space-between'>
			<Typography fontSize='1.75em' noWrap fontWeight='700'> {title} </Typography>

			<Box display='flex' alignItems='center'>
				<Switch value={only_active === undefined ? false : only_active} onChange={handleSwitchChange}
					switchPrefix={<Typography variant='h5' noWrap fontWeight='500'>
						Только активные заказы
					</Typography>} />
				<Box mx='10px'>
					<Input value={search} onChange={handleChange} placeholder='Поиск' inputSize='m' endAdornment={<SearchIcon />} />
				</Box>
				<Button buttonSize='m' variant='contained' startIcon={<FilterIcon />} onClick={onOpen} sx={{ backgroundColor: "#025F3E", '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}> Фильтр </Button>
			</Box>
		</Box>
	);
};