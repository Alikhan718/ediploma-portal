import React from 'react';

import { Box, Typography } from '@mui/material';

export const SettingsPageHeader: React.FC = () => {

	return (
		<Box display='flex' alignItems='center' justifyContent='space-between'>
			<Typography fontSize='1.75em' noWrap fontWeight='700'> Настройка времени </Typography>
		</Box>
	);
};
