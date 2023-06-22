import { SwitchProps as CustomSwitchProps } from '@mui/material';
import React from 'react';
export interface SwitchProps extends CustomSwitchProps {
	switchPrefix?: React.ReactNode;
	switchSuffix?: React.ReactNode;
}