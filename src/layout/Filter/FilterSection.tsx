import React from 'react';
import {Box, Card, Chip, Slider, Typography} from "@mui/material";
import {IFilter} from "@src/layout/Filter/FilterSection.props";
import {ReactComponent as CloseIcon} from "@src/assets/icons/cross.svg";
import {regions, specialities, years} from "@src/layout/Filter/generator";
import {Button} from "@src/components";

export const FilterSection: React.FC<IFilter> = (props) => {
    const {open, setOpen} = props;
    const [selectedSpecialities, setSelectedSpecialities] = React.useState([""]);
    const [selectedGPA, setSelectedGPA] = React.useState(([1.0, 4.0]));
    const [selectedYear, setSelectedYear] = React.useState([2023]);
    const [selectedRegions, setSelectedRegions] = React.useState([""]);
    const [filterAttributes, setFilterAttributes] = React.useState({});
    const handleChange = (e: any, arr: any, setE: any) => {
        setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [...arr, e]);
    };
    const handleGPA = (event: Event, newValue: number | number[]) => {
        setSelectedGPA(newValue as number[]);
    };
    return (
        <React.Fragment>
            <Box display={open ? 'flex' : 'none'} width='60vw' position='absolute' top='3.3rem'
                 right='10rem' justifyContent='center'>
                <Card elevation={6} sx={{
                    width: "100%",
                    borderRadius: "1rem",
                    padding: "2rem 4rem",
                    gap: "1rem",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography
                            fontSize='1.5rem'
                            fontWeight='600'
                        >
                            Фильтр
                        </Typography>
                        <CloseIcon style={{cursor: "pointer"}} onClick={() => {
                            setOpen(false);
                        }}/>
                    </Box>
                    <Box display='flex' flexWrap='wrap' width='100%' justifyContent='space-between' gap='1.5rem 0'>
                        <Box width='48%'>
                            <Typography fontSize='1.25rem'>
                                Специальности
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem'>
                                {specialities.map((speciality) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities);
                                            }}
                                            className={(selectedSpecialities.includes(speciality.name) ? 'active' : 'unactive') + 'Chip' + " customChip"}
                                            key={speciality.id}>
                                        {speciality.name}
                                    </Button>)}
                            </Box>
                        </Box>
                        <Box width='48%'>

                            <Typography fontSize='1.25rem'>
                                Регион
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem'>
                                {regions.map((region) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(region.name, selectedRegions, setSelectedRegions);
                                            }}
                                            className={(selectedRegions.includes(region.name) ? 'active' : 'unactive') + 'Chip' + " customChip"}
                                            key={region.id}>
                                        {region.name}
                                    </Button>)}
                            </Box>
                        </Box>
                        <Box width='48%'>
                            <Typography fontSize='1.25rem'>
                                GPA
                            </Typography>
                            <Slider
                                max={4.0}
                                min={1.0}
                                step={0.1}
                                getAriaLabel={() => 'GPA'}
                                value={selectedGPA}
                                onChange={handleGPA}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Box width='48%'>
                            <Typography fontSize='1.25rem'>
                                Год выпуска
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem'>
                                {years.map((year) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(year.year, selectedYear, setSelectedYear);
                                            }}
                                            className={(selectedYear.includes(year.year) ? 'active' : 'unactive') + 'Chip' + " customChip"}
                                            key={year.id}>
                                        {year.year}
                                    </Button>)}
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>


        </React.Fragment>
    );
};
