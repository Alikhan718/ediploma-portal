import React from 'react';
import {Box, Card, Slider, Typography} from "@mui/material";
import {IFilter} from "@src/layout/Filter/FilterSection.props";
import {ReactComponent as CloseIcon} from "@src/assets/icons/cross.svg";
import {regions, specialities, years} from "@src/layout/Filter/generator";
import {Button} from "@src/components";
import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";
import cn from "classnames";

export const FilterSection: React.FC<IFilter> = (props) => {

    const {open, setOpen, filterAttributes, setFilterAttributes, triggerSearchFilters} = props;
    const [selectedSpecialities, setSelectedSpecialities] = React.useState<string[]>([]);
    const [selectedGPA, setSelectedGPA] = React.useState(([1.0, 4.0]));
    const [selectedYear, setSelectedYear] = React.useState<number[]>([]);
    const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);

    React.useEffect(() => {
        const filterValues = {
            text: filterAttributes.text,
            specialities: selectedSpecialities.join(",") ?? filterAttributes.specialities,
            region: selectedRegions.join(",") ?? filterAttributes.region,
            year: selectedYear.join(",") ?? filterAttributes.year,
            gpaL: selectedGPA[0] ?? filterAttributes.gpaL,
            gpaR: selectedGPA[1] ?? filterAttributes.gpaR,
        };

        // Update the filterAttributes state
        setFilterAttributes(filterValues);
        console.log(filterValues);
        setFilterAttributes(filterValues);
        triggerSearchFilters(filterValues);

    }, [selectedYear, selectedRegions, selectedSpecialities, selectedGPA]);

    const handleChange = (e: any, arr: any, setE: any) => {
        setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [...arr, e]);
    };

    const handleGPA = (event: Event, newValue: number | number[]) => {
        setSelectedGPA(newValue as number[]);
    };

    return (
        <React.Fragment>
            <Box display={open ? 'flex' : 'none'} width='60vw' position='absolute' top='3.3rem'
                 right='10rem' justifyContent='center'
                 className={styles.filterContainer}
            >
                <Card elevation={6} sx={{
                    width: "100%",
                    borderRadius: "1rem",
                    padding: "2rem 4rem",
                    gap: "1rem",
                    display: "flex",
                    flexDirection: "column",
                }}
                      className={styles.mobP2}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography
                            fontSize='1.5rem'
                            fontWeight='600'
                            className={styles.mobTextMd}
                        >
                            Фильтр
                        </Typography>
                        <CloseIcon style={{cursor: "pointer"}} onClick={() => {
                            setOpen(false);
                        }}/>
                    </Box>
                    <Box display='flex' flexWrap='wrap' width='100%' height="25%" justifyContent='space-between'
                         gap='1.5rem 0'>
                        <Box width='48%' className={styles.mobW100}
                             mb="2rem"
                             height="100%">
                            <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                                Специальности
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem' p=".5rem" height="100%"
                                 overflow="hidden scroll">
                                {specialities.map((speciality) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities);
                                            }}
                                            className={cn(((selectedSpecialities.includes(speciality.name) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
                                            key={speciality.id}>
                                        <Typography whiteSpace="normal" fontSize="1rem" lineHeight="normal"
                                                    sx={{color: "inherit !important"}}>
                                            {speciality.name}
                                        </Typography>
                                    </Button>)}
                            </Box>
                        </Box>
                        <Box width='48%' className={styles.mobW100}
                             mb="2rem"
                             height="100%">

                            <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                                Регион
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' p=".5rem" mt='.5rem' height="100%"
                                 overflow="hidden scroll">
                                {regions.map((region) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(region.name, selectedRegions, setSelectedRegions);
                                            }}
                                            className={cn(((selectedRegions.includes(region.name) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
                                            key={region.id}>
                                        <Typography whiteSpace="normal" fontSize="1rem" lineHeight="normal"
                                                    sx={{color: "inherit !important"}}>
                                            {region.name}
                                        </Typography>
                                    </Button>)}
                            </Box>
                        </Box>
                        <Box width='48%' className={styles.mobW100}>
                            <Typography fontSize='1.25rem' className={styles.mobTextMd}>
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
                        <Box width='48%' className={styles.mobW100}>
                            <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                                Год выпуска
                            </Typography>
                            <Box display='flex' gap='.5rem' flexWrap='wrap' mt='.5rem'>
                                {years.map((year) =>
                                    <Button variant='outlined'
                                            onClick={() => {
                                                handleChange(year.year, selectedYear, setSelectedYear);
                                            }}
                                            className={cn(((selectedYear.includes(year.year) ? 'active' : 'unactive') + 'Chip' + " customChip"), styles.mobPBtn, styles.mobTextSm)}
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
