export interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
	label?: string;
	helper?: React.ReactNode | string;
	error?: string;
	fullWidth?: boolean;
};