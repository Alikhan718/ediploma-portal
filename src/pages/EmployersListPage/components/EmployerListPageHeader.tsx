import React from 'react';
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/EmployersListPage/generator';

export const EmployerListPageHeader: React.FC = (props) => {

	const lang = useSelector(selectLanguage);

	return (
		<>
			<Box width="100%">
				<Box display="flex" flexDirection="row"
					 justifyContent="space-between" alignItems="baseline"
					 margin={{
						 xs: '48px 0 20px',
						 sm:'48px 0 24px',
						 md:'24px 0',
						 lg: '36px 0 30px',
						 xl: '40px 0 32px',
					 }}
				>
					<Typography fontWeight='700' fontSize={{
						xs: '1.375rem',
						sm:'2rem',
						lg: '2.5rem',
						xl: '3rem',
					}} >
						{localization[lang].Header.university}
					</Typography>
				</Box>
			</Box>
		</>
	);
};