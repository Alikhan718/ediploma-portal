import { SelectProps as MuiSelectProps } from '@mui/material';
import React from 'react';

export interface SelectProps extends Omit<MuiSelectProps, 'label'> {
	selectSize?: 's' | 'm' | 'l';
	helper?: string;
	label?: string;
	fullWidth?: boolean;
	edit?: string;
	onDelete?: React.EventHandler<any>
}