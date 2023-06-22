import { TextFieldProps } from '@mui/material';

export interface TexttFieldSelectProps extends Omit<TextFieldProps, 'label'> {
  selectSize?: 's' | 'm' | 'l';
  helper?: React.ReactNode | string;
  label?: string;

}