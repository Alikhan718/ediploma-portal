import { Box, SvgIcon } from "@mui/material";
import React from 'react';
import icon from "./../../assets/icons/icon";

const FastIcon = ({ name, width, height, style, ...props }: any) => {
	return (
		<Box
			sx={{
				width: width,
				height: height,
				...style,
			}}
			{...props}
		>
			{icon[name]}
		</Box>
	);
};

export default FastIcon;
