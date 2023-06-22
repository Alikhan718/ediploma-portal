import React from 'react';
import { FormControl, TextareaAutosize, styled } from '@mui/material';
import { Label } from '../Label/Label';

import { TextareaProps } from './Textarea.props';

const CustomTextarea = styled(TextareaAutosize)({
	width: '100%',
	borderRadius: '10px',
	resize: 'none',
});

export const Textarea: React.FC<TextareaProps> = (props) => {
	const { label, helper, fullWidth, error, value, onChange, name } = props;

	return (
		<FormControl fullWidth={fullWidth} >
			{label && <Label label={label} helper={helper} />}
			<CustomTextarea minRows={6} value={value} onChange={onChange} name={name} />
		</FormControl>
	);
};