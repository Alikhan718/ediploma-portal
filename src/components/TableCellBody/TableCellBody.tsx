import React from 'react';
import { TableCell, styled, TableCellProps } from '@mui/material';

const CustomTableCell = styled(TableCell)({
	padding: '15px 10px',
	cursor: 'pointer',
});

export const TableCellBody: React.FC<TableCellProps> = (props) => {
	const { children, ...otherProps } = props;
	return (
		<CustomTableCell {...otherProps}>
			{children}
		</CustomTableCell>
	);
};