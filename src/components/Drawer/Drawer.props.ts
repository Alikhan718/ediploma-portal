import { DrawerProps as MuiDrawerProps } from '@mui/material';
export interface DrawerProps extends MuiDrawerProps {
	open: boolean;
	onClose: () => void;
}