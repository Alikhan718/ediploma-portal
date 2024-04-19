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
        <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>{label}</Typography>
            <Slider
                getAriaLabel={() => label}
                value={value}
                onChange={handleSliderChange}
                min={min}
                max={max}
                step={0.1}
                sx={{
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
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>{min}</Typography>
                <Input
                    value={value}
                    size="small"
                    inputProps={{
                        step: 0.1,
                        min: min,
                        max: max,
                        type: 'number',
                        'aria-labelledby': 'slider-label',
                    }}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    sx={{
                        '& input:focus': {
                            outline: 'none',
                        },
                        '.MuiInputBase-input': {
                            borderBottom: 'none !important',
                            border: 'none',
                            borderRadius: '13px',
                            fontSize: '14px',
                            padding: '4px 12px',
                            textAlign: 'center',
                            backgroundColor: '#629BF8',
                            color: 'white',
                        },
                        '& .MuiInputBase-input::after': {
                            borderBottom: 'none',
                        },
                        'input[type=number]': {
                            '-moz-appearance': 'textfield',
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                            '&::after': {
                                borderBottom: 'none',
                            },
                        },
                    }}
                />
                <Typography sx={{ color: '#A1A1A1', fontSize: '14px', fontWeight: 400 }}>{max}</Typography>
            </Box>
        </Box>
    );
};

export default FilterSlider;
