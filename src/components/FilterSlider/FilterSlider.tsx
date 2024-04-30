import React from 'react';
import { Typography, Slider, Box, Input } from "@mui/material";

interface FilterSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
}

const FilterSlider: React.FC<FilterSliderProps> = ({ label, value, onChange, min, max }) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        onChange(newValue as number);
    };

    return (
        <Box sx={{paddingTop:'1rem',}}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{label}</Typography>
            <Slider
                getAriaLabel={() => label}
                value={value}
                onChange={handleSliderChange}
                min={min}
                max={max}
                step={0.1}
                sx={{
                    paddingTop: '1rem',

                    '& .MuiSlider-thumb': {
                        width: '10px',
                        height: '22px',
                        borderRadius: '64px',
                        border: '1px solid #D8E6FD',
                        background: 'white',

                    },
                    '& .MuiSlider-input': {
                        border:'none',
                    },
                    '& .MuiSlider-rail': {
                        borderRadius: '32px',
                        height: '8px',
                        background: '#F8F8F8',
                    },
                    '& .MuiSlider-track': {
                        borderRadius: '32px',
                        height: '8px',
                        background: 'linear-gradient(to right, #3B82F6, #3B82F6)',
                    },
                }}
            />
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', }}>
                <Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>{min}.0</Typography>
                <Input
                    value={value}
                    size="small"
                    disableUnderline
                    inputProps={{
                        step: 0.1,
                        min: min,
                        max: max,
                        type: 'number',
                        'aria-labelledby': 'slider-label',
                    }}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    sx={{

                        /* Скрыть стрелки для числового типа инпута */
                        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                        /* Firefox */
                        'input[type="number"]': {
                            MozAppearance: 'textfield',
                        },


                        '.MuiInputBase-input': {
                            borderRadius: '13px',
                            fontSize: '14px',
                            padding: '4px 12px',
                            textAlign: 'center',
                            backgroundColor: '#629BF8',
                            color: 'white',

                        },

                    }}
                />
                <Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>{max}.0</Typography>
            </Box>
        </Box>
    );
};

export default FilterSlider;
