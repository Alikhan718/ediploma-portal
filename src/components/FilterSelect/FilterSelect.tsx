import React from 'react';
import {FormControl, InputLabel, Select, MenuItem,  SelectChangeEvent, InputBase} from "@mui/material";
import {styled} from "@mui/material/styles";
import { ReactComponent as ExpandMoreIcon } from '@src/assets/icons/expandmore.svg';
interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { id: number, name: string }[];
    onItemClick: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options, onItemClick }) => {
    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        const value = event.target.value;
        onChange(value);
    };

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            backgroundColor:'#F8F8F8',
            borderRadius: '48px',

        },
        'label + & : focus':{
            borderRadius:'48px',
        },
        'label + & : active':{
            borderRadius:'48px',
        },
        '& .MuiInputBase-input': {
            padding:'0.75rem 20px',
            borderRadius:'48px',
            position: 'relative',
            backgroundColor:'#F8F8F8',
            border: 'none',
            fontSize: '14px',
            color:'#58607C',
            '&:focus': {
                borderRadius: '48px',
                color:'#58607C'
            },
        },
    }));

    return (
        <FormControl variant='filled' size='small' sx={{ width: '100%' }}>
            <InputLabel
                id="select-label"
                shrink={false}
                sx={{
                    color: '#383838',
                    fontSize: '14px',
                    zIndex: 10,
                    '&.Mui-focused': {
                        color: '#383838',
                        textTransform: 'none',
                    },
                    '&:focus-within': {
                        color: '#383838',
                        textTransform: 'none',
                    }
                }}
            >
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={handleSelectChange}
                labelId="select-label"
                id="select"
                input={<BootstrapInput />}
                IconComponent={ExpandMoreIcon}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: '#FFF',
                            borderRadius: '12px',
                            boxShadow: '0px 24px 36px 0px rgba(207, 215, 226, 0.48)',
                            strokeWidth: '1px',
                            stroke: 'black',
                            maxHeight: 200,
                            maxWidth: 300,
                            zIndex: 9999,
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option.name}
                        sx={{ fontSize: '14px' }}
                        onClick={() => onItemClick(option.name)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default FilterSelect;
