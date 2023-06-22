export interface ModalProps {
	open: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
	maxWidth?: number,
	marginLeft?: string,
	marginRight?: string,
}
