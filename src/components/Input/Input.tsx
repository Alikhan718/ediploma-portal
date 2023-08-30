import React from 'react';
import {Label} from '@src/components';
import {FormControl, IconButton, InputAdornment, OutlinedInput, styled} from '@mui/material';

import {InputProps} from './Input.props';
import {ReactComponent as Visibility} from "@src/assets/icons/eye_open.svg";
// import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomOutlineInput = styled(OutlinedInput, {
        shouldForwardProp: (prop) => prop !== 'inputSize',
    })
    < {inputSize: 's' | 'm' | 'l', textALign: 'start' | 'center' | 'end'} > (({inputSize, textALign , theme}) => ({
        borderRadius: '48px',
        backgroundColor: '#F8F8F8',
        '& .MuiOutlinedInput-input': {
            fontSize: theme.typography.fontSize,
            padding: inputSize === 's' ? '12px 20px' : inputSize === 'm' ? '13.5px 20px' : '8px 0',
            textAlign: textALign
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "#F8F8F8"
        }


    }));

export const Input: React.FC<InputProps> = (props) => {
    const {textALign = 'start', fullWidth, inputSize = 's',  label, activeBorderColor = 'primary', helper, ...otherProps} = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl fullWidth={fullWidth} sx={{width: "100%"}}>
            {label && <Label label={label} helper={helper}/>}
            <CustomOutlineInput
                textALign={textALign}
                fullWidth={fullWidth}
                inputSize={inputSize}
                {...otherProps}
                type={otherProps.type == "password" ? (showPassword ? 'text' : 'password') : otherProps.type}
                endAdornment={otherProps.type == "password" ?
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment> : otherProps.endAdornment
                }
            />
        </FormControl>
    );
};