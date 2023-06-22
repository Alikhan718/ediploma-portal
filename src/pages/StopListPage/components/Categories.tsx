import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@src/components';
import { StopListSections } from '../generator';

interface ICategories {
	categories: Array<any>,
	active_section_name: string | null,
	handleSectionName: (item: { name: string, value?: boolean }) => void;
};



export const Categories: React.FC<ICategories> = ({ active_section_name, handleSectionName }) => {
	const handleClick = (item: { name: string, value?: boolean }): void => {
		handleSectionName(item);
	};


	return (
		<Box sx={{
			maxWidth: "1548px",
			width: "100%",
			display: "flex",
			overflowX: "auto",
			whiteSpace: "nowrap",
			flexWrap: "nowrap",
			padding: "10px 0"
		}}>
			{StopListSections.map((item) => (
				<Button
					sx={{
						width: "auto",
						flex: "0 0 auto",
						marginRight: "5px",
						'&:hover': { backgroundColor: active_section_name === item.name ? '#FFBC5C' : '', boxShadow: 'none' }
					}}
					key={item.name}
					color={active_section_name === item.name ? "secondary" : "onyx"}
					onClick={() => handleClick(item)}
					variant={active_section_name === item.name ? "contained" : "text"}
					buttonSize='m'>
					{item.name}
				</Button>

			))}

		</Box>
	);
};