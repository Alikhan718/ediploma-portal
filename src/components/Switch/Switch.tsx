import React from 'react';
import { styled, Switch as MuiSwitch, SwitchProps as CustomSwitchProps, Box } from '@mui/material';

import { SwitchProps } from './Switch.props';

const CustomSwitch = styled((props: CustomSwitchProps) => (
	<MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 68,
	height: 34,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(34px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#189C4B',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 30,
		height: 30,
	},
	'& .MuiSwitch-track': {
		borderRadius: 40 / 2,
		backgroundColor: '#E8E8E9',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 300,
		}),
	},
}));


export const Switch: React.FC<SwitchProps> = (props) => {
	const { switchPrefix, switchSuffix, ...otherProps } = props;
	return (
		<Box display='inline-flex' alignItems='center'>
			{switchPrefix ? <Box display='inline-flex' alignItems='center' mr='10px'> {switchPrefix} </Box> : null}
			<CustomSwitch {...otherProps} />
			{switchSuffix ? <Box display='inline-flex' alignItems='center' mr='10px'> {switchSuffix} </Box> : null}
		</Box>
	);
};