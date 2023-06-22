import React from 'react';
import { TableCell, styled, TableCellProps } from '@mui/material';

const CustomTableCell = styled(TableCell)({
	padding: '10px 10px',

	borderBottom: 'none',
});


export const TableCellHead: React.FC<TableCellProps> = (props) => {
	const { children, ...otherProps } = props;
	return (
		<CustomTableCell {...otherProps}>
			{children}
		</CustomTableCell>
	);
};
