import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ToolTipProps } from './ToolTip.props';


const CustomTooltip = styled(({ className, textColor, ...props }: ToolTipProps) => (
  <Tooltip {...props} color={textColor} classes={{ popper: className }} />
))(({ theme, textColor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "15px",
    width: "430px",
    color: textColor || theme.palette.success,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

export const ToolTip: React.FC<ToolTipProps> = (props) => {
  return (
    <CustomTooltip {...props} >
      {props.children}
    </CustomTooltip>
  );
};
