import { OutlinedInputProps } from '@mui/material';
import React from 'react';

export interface InputProps extends Omit<OutlinedInputProps, 'label'> {
	inputSize?: 's' | 'm' | 'l';
	label?: string;
	textAlign?: 'start' | 'center' | 'end';
	helper?: React.ReactNode | string;
	reducePadding?: boolean;
	activeBorderColor?: 'primary' | 'success' | 'warning'
};