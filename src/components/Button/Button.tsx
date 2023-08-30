import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

import { ButtonProps } from './Button.props';


const CustomButton = styled(MuiButton, {
	shouldForwardProp: (prop) => prop !== 'buttonSize',
})<ButtonProps>(({ buttonSize, borderRadius, width }) => ({
	padding: buttonSize === 's' ? '0px 20px' : buttonSize === 'm' ? '0px 25px' : '0',
	height: buttonSize === 's' ? '48px' : buttonSize === 'm' ? '50px' : '0px',
	width,
	borderRadius,
	fontWeight: 400,
	lineHeight: 0,
	whiteSpace: 'nowrap',
	boxShadow: 'none',
	backgroundColor: 'primary',
}));

export const Button: React.FC<ButtonProps> = (props) => {
	const { children, buttonSize = 's', ...otherProps } = props;
	return (
		<CustomButton buttonSize={buttonSize} {...otherProps}>
			{children}
		</CustomButton>
	);
};
