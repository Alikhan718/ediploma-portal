import React from 'react';
import { TableRow, styled, TableRowProps } from '@mui/material';

const CustomTableRow = styled(TableRow)({
  "&:hover": {
    background: "#EFF6F2 !important",
    color: "#025F3E !important"
  },
  "&:hover > 	.MuiTableCell-root": {
    color: "#025F3E !important",
  }
});


export const TableHoverRow: React.FC<TableRowProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <CustomTableRow {...otherProps}>
      {children}
    </CustomTableRow>
  );
};
