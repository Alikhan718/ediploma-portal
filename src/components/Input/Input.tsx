import React from 'react';
import { Label } from '@src/components';
import { OutlinedInput, FormControl, styled } from '@mui/material';

import { InputProps } from './Input.props';


const CustomOutlineInput = styled(OutlinedInput, {
	shouldForwardProp: (prop) => prop !== 'inputSize',
})
	<{ inputSize: 's' | 'm' | 'l' }>(({ inputSize, theme }) => ({
		borderRadius: '10px',
		backgroundColor: '#DADADA',
		'& .MuiOutlinedInput-input': {
			fontSize: theme.typography.fontSize,
			padding: inputSize === 's' ? '8.5px 20px' : inputSize === 'm' ? '13.5px 20px' : '8px 0',

		},

	}));

export const Input: React.FC<InputProps> = (props) => {
	const { fullWidth, inputSize = 's', label, activeBorderColor = 'primary', helper, ...otherProps } = props;

	return (
		<FormControl fullWidth={fullWidth}>
			{label && <Label label={label} helper={helper} />}
			<CustomOutlineInput fullWidth={fullWidth} inputSize={inputSize} {...otherProps} />
		</FormControl>
	);
};