import React from 'react';
import {Label} from '@src/components';
import {FormControl, IconButton, InputAdornment, OutlinedInput, styled} from '@mui/material';

import {InputProps} from './Input.props';
import {ReactComponent as VisibilityOff} from "@src/assets/icons/eye_open.svg";
import {ReactComponent as Visibility} from '@src/assets/icons/eye_closed.svg';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomOutlineInput = styled(OutlinedInput, {
        shouldForwardProp: (prop) => prop !== 'inputSize',
    })
    < {inputSize: 's' | 'm' | 'l', textAlign: 'start' | 'center' | 'end', reducePadding: boolean}> (({inputSize, textAlign , theme, reducePadding}) => ({
        borderRadius: !reducePadding ? '48px' : '15px',
        backgroundColor: '#F8F8F8',
        '& .MuiOutlinedInput-input': {
            fontSize: theme.typography.fontSize,
            padding: inputSize === 's' ? !reducePadding ? '12px 20px' : "0 10px" : inputSize === 'm' ? '13.5px 20px' : '8px 0',
            textAlign: textAlign
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "#F8F8F8"
        }


    }));

export const Input: React.FC<InputProps> = (props) => {
    const {reducePadding = false, textAlign = 'start', fullWidth, inputSize = 's',  label, activeBorderColor = 'primary', helper, ...otherProps} = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl fullWidth={fullWidth} sx={{width: "100%"}}>
            {label && <Label label={label} helper={helper}/>}
            <CustomOutlineInput
                textAlign={textAlign}
                fullWidth={fullWidth}
                inputSize={inputSize}
                reducePadding={reducePadding}
                {...otherProps}
                type={otherProps.type == "password" ? (showPassword ? 'text' : 'password') : otherProps.type}
                endAdornment={otherProps.type == "password" ?
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            style={{marginRight: "0"}}
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