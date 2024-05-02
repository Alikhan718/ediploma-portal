import React from 'react';
import { Box, Typography, CardMedia, Button, IconButton } from '@mui/material';
import userImg from "@src/assets/dashboard/Image.jpg";
import {ReactComponent as FavoriteDiploma} from '@src/assets/icons/favoriteDiploma.svg';
import {RatingDisplay} from '@src/components/RatingDisplay/RatingDisplay';
import { localization } from '../generator';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@src/store/generals/selectors';

interface StudentInfoProps {
    student: any;
}

export const StudentInfo: React.FC<StudentInfoProps> = (props) => {
    const { student } = props;
    const lang = useSelector(selectLanguage);
    const sample = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '123-456-7890',
        date_of_birth: '01/01/2000',
        region: 'North America',
        university_name: 'University of Toronto',
        speciality: 'Computer Science',
        degree: 'Bachelor',
        academic_rating: 4.0,
        gpa: '4.0',
        skills: ['skill', 'skill', 'skill', 'skill', 'skill', 'skill', 'skill', 'skill', 'skill'],
    };

    const [isFavorite, setIsFavorite] = React.useState(true);
    return (
        <Box sx={{
            display: 'flex', padding: '1.75rem', borderRadius: '1.25rem', 
            gap: '1.75rem', backgroundColor: '#F4F7FE', width: '100%',
            justifyContent: 'space-between'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                    <Typography fontWeight='600' sx={{ fontSize: '28px' }} >
                        {sample && sample.name ? sample.name : ''} 
                    </Typography>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{paddingX: '1rem', paddingY: '0.75', backgroundColor: '#EBF2FE', borderRadius: '1.25rem'}}>
                            <Typography sx={{ fontSize: '0.875rem', color: '#3B82F6' }}>
                                {localization[lang].student}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.875rem' }}>
                            {sample && sample.email ? sample.email : ''}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1.25rem'}}>
                        <Button 
                            variant={'contained'} 
                            sx={{
                                borderRadius: '2.5rem', paddingX: '1.5rem', paddingY: '0.5rem',
                                boxShadow: 0, ':hover': {boxShadow: 0}
                            }}
                        >
                            {localization[lang].invite}
                        </Button>
                        <Button 
                            variant={'contained'} 
                            sx={{
                                borderRadius: '2.5rem', paddingX: '1.5rem', paddingY: '0.5rem',
                                backgroundColor: '#FDECEC', color: '#EF4444', boxShadow: 0, 
                                ':hover': {
                                    backgroundColor: '#F7DAD9',  boxShadow: 0,
                                }
                            }}
                        >
                            {localization[lang].reject}
                        </Button>
                        <IconButton
                            color="primary"
                            sx={{
                              width: "2.5rem",
                              height: "2.5rem",
                              backgroundColor: "#D8E6FD",
                            }}
                        >
                            {/* {isFavorite ? <StarPressed/> : <Star/>} */}
                            <FavoriteDiploma fill={isFavorite ? "#3B82F6" : "white"}/>
                        </IconButton>
                        <Button sx={{padding: '0.5rem', borderRadius: '2.5rem'}}>
                            {localization[lang].goToProfile}
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].dateofbirth}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.date_of_birth ? sample.date_of_birth : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].region}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.region ? sample.region : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].email}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.email ? sample.email : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].phone}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.phone ? sample.phone : ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].university}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.university_name ? sample.university_name : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].specialityName}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.speciality ? sample.speciality : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].degree}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.degree ? sample.degree : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                GPA:
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {sample && sample.gpa ? sample.gpa : ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].rating}
                            </Typography>
                            <RatingDisplay academicRating={sample && sample.academic_rating ? sample.academic_rating : 0}/>
                        </Box>
                    </Box>
                    {sample.skills && <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <Typography sx={{fontWeight: 600, fontSize: '1.5rem'}}>
                            {localization[lang].skills}
                        </Typography>
                        <Box sx={{display: 'flex', gap: '0.75rem'}}>
                            {sample && sample.skills && sample.skills.map((skill: string, index: number) => (
                                <Box key={index} sx={{
                                    paddingX: '1rem', paddingY: '0.5rem', backgroundColor: '#FFFFFF', borderRadius: '1rem'
                                }}>
                                    <Typography sx={{fontSize: '0.875rem', color: '#58607C'}}>
                                        {skill}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>}
                </Box>
            </Box>
                
            <Box>
                <CardMedia
                  component="img" image={userImg}
                  sx={{ width: '10.25rem', height: '10.25rem', borderRadius: '9rem', objectFit: 'cover' }}
                />
            </Box>
        </Box>
    )
};