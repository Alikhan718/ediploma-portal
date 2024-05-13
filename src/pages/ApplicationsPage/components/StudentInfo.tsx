import React from 'react';
import { Box, Typography, CardMedia, Button, IconButton } from '@mui/material';
import userImg from "@src/assets/dashboard/Image.jpg";
import {ReactComponent as FavoriteDiploma} from '@src/assets/icons/favoriteDiploma.svg';
import {RatingDisplay} from '@src/components/RatingDisplay/RatingDisplay';
import { localization } from '../generator';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@src/store/generals/selectors';
import { useNavigate } from 'react-router-dom';

interface StudentInfoProps {
    application: any;
    handleChangeStatus: any;
}

const statuses = {
    processing: {
        'ru': 'Не просмотрено',
        'kz': 'Не просмотрено',
        'en': 'Not viewed',
    },
    rejected: {
        'ru': 'Отклонено',
        'kz': 'Отклонено',
        'en': 'Rejected',
    },
    invited: {
        'ru': 'Приглашен',
        'kz': 'Шақырылды',
        'en': 'Invited',
    },
};

const majorLocales = {
    "\"Bachelor\"": {
      'ru': "Бакалавр",
      'kz': "Бакалавр",
      'en': "Bachelor"
    },
    "\"Master\"": {
      'ru': "Магистр",
      'kz': "Маигстр",
      'en': "Master"
    }
};

const universityName = {
    3: {
      'kz': 'Қ.И. атыңдағы ҚазҰТЗУ',
      'ru': 'КазНИТУ имени К. И. Сатпаева',
      'en': 'Satbayev University'
    },
    1: {
      'kz': 'Қазақстан-Британ техникалық университеті',
      'ru': 'Казахстанско-Британский Технический Университет',
      'en': 'Kazakhstan-British Technical University'
    },
    2: {
      'kz': 'Q-Lab',
      'ru': 'Q-Lab',
      'en': 'Q-Lab'
    }
};

export const StudentInfo: React.FC<StudentInfoProps> = (props) => {
    const { application, handleChangeStatus } = props;
    const lang = useSelector(selectLanguage);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(true);

    const goToProfile = (id: number) => {
        window.open(`/student/${id}`, '_blank');
    };

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
                        {application && lang === 'kz' ? application.name_kz : lang === 'ru' ? application.name_ru : application.name_en}
                    </Typography>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{paddingX: '1rem', paddingY: '0.75', backgroundColor: '#EBF2FE', borderRadius: '1.25rem'}}>
                            <Typography sx={{ fontSize: '0.875rem', color: '#3B82F6' }}>
                                {localization[lang].student}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.875rem' }}>
                            {application && application.diploma_email ? application.diploma_email : ''}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1.25rem'}}>
                        {
                            application && application.status === 'invited' ? 
                            (<Box
                                sx={{
                                    borderRadius: '1.25rem', paddingX: '1rem', paddingY: '0.75rem',
                                    fontSize: '0.875rem', background: '#E9F9EF', color: '#22C55E',
                                }}
                            >
                                {application && application.status ? statuses[application.status as keyof typeof statuses][lang] : 'Статус'}
                            </Box>) : application.status === 'rejected' ? 
                            (<Box
                                sx={{
                                    borderRadius: '1.25rem', paddingX: '1rem', paddingY: '0.75rem',
                                    fontSize: '0.875rem', background: '#FDECEC', color: '#EF4444',
                                }}
                            >
                                {application && application.status ? statuses[application.status as keyof typeof statuses][lang] : 'Статус'}
                            </Box>) :
                            (<>
                                <Button 
                                    variant={'contained'} 
                                    sx={{
                                        borderRadius: '2.5rem', paddingX: '1.5rem', paddingY: '0.5rem',
                                        boxShadow: 0, ':hover': {boxShadow: 0}
                                    }}
                                    onClick={()=>{handleChangeStatus('invited', application.id)}}
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
                                    onClick={()=>{handleChangeStatus('rejected', application.id)}}
                                >
                                    {localization[lang].reject}
                                </Button>
                            </>)}
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
                        <Button sx={{padding: '0.5rem', borderRadius: '2.5rem'}} onClick={() => goToProfile(application.diploma_id)}>
                            {localization[lang].goToProfile}
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].dateofbirth}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && application.diploma_date_of_birth ? application.diploma_date_of_birth : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].region}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && application.diploma_region ? application.diploma_region : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].email}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && application.diploma_email ? application.diploma_email : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].phone}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && application.diploma_phone ? application.diploma_phone : ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].university}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && universityName[application.university_id as keyof typeof universityName] ? universityName[application.university_id as keyof typeof universityName][lang] : ""}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].specialityName}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                { application && lang === 'ru' ? application.speciality_ru : lang === 'kz' ? application.speciality_kz : application.speciality_en }
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].degree}
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && majorLocales[application.diploma_degree as keyof typeof majorLocales] ? majorLocales[application.diploma_degree as keyof typeof majorLocales][lang] : ''}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '12rem'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                GPA:
                            </Typography>
                            <Typography sx={{fontSize: '1rem'}}>
                                {application && application.gpa ? application.gpa : ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Box sx={{display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography sx={{color: '#9499AB', fontSize: '1rem'}}>
                                {localization[lang].rating}
                            </Typography>
                            <RatingDisplay academicRating={application && application.rating ? application.rating : 0}/>
                        </Box>
                    </Box>
                    {application.skills && <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <Typography sx={{fontWeight: 600, fontSize: '1.5rem'}}>
                            {localization[lang].skills}
                        </Typography>
                        <Box sx={{display: 'flex', gap: '0.75rem'}}>
                            {application && application.skills && application.skills.map((skill: string, index: number) => (
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