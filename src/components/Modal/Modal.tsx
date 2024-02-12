import React from 'react';
import { Modal as CustomModal, Box } from '@mui/material';

import { ModalProps } from './Modal.props';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: "840",
	maxHeight: "90vh",
	width: '25%',
	bgcolor: 'common.white',
	boxShadow: 24,
	p: '30px 40px',
	borderRadius: '20px',
	marginLeft: "0",
	marginRight: "0",
	"@media (max-width: 1024px)": {
		width: "60%",
	},
	"@media (max-width: 768px)": {
		width: "95%",
	}
};

export const Modal: React.FC<ModalProps> = (props) => {
	const { open, children, handleClose, maxWidth, maxHeight, width,  marginLeft = "0", marginRight = "0" , ...other} = props;
	style.width = width ? width : style.width;
	style.maxWidth = maxWidth ? maxWidth : style.maxWidth;
	style.maxHeight = maxHeight ? maxHeight : style.maxHeight;
	style.marginLeft =  marginLeft ? marginLeft : style.marginLeft;
	style.marginRight =  marginRight ? marginRight : style.marginRight;
	return (
		<CustomModal open={open} onClose={handleClose}>
			<Box sx={style} maxWidth={maxWidth} {...other} className="mediaQueryWidth">
				{children}
			</Box>
		</CustomModal>
	);
};
