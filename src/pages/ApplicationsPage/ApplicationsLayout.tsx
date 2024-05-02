import React from 'react';
import { Box, Typography, Button as MuiButton, Table, TableBody, Paper, TableContainer, useMediaQuery, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { fetchApplications, fetchStatus } from '@src/store/vacancy/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectApplications } from '@src/store/vacancy/selector';
import { selectUserRole } from '@src/store/auth/selector';
import { set } from 'react-ga';
import { ReactComponent as Reject } from '@src/assets/icons/reject.svg';
import { ReactComponent as Invite } from '@src/assets/icons/invite.svg';
import { useNavigate } from "react-router-dom";
import { StudentInfo } from './components/StudentInfo';
import { localization } from './generator';
import { selectLanguage } from '@src/store/generals/selectors';

export const ApplicationsLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();
    const role = useSelector(selectUserRole).toLowerCase();
    const applications: any = useSelector(selectApplications);
    const [applicationsList, setApplicationsList] = React.useState<any[]>(applications);
    const [value, setValue] = React.useState<number>(0);
    const isMobile = useMediaQuery('(max-width:998px)');
    const navigate = useNavigate();
    const [openStudentInfo, setOpenStudentInfo] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (applications) {
            if (value === 0) {
                setApplicationsList(applications.filter((application: any) => application.status === 'processing'));
                // setApplicationsList(applications);
            } else if (value === 1) {
                setApplicationsList(applications.filter((application: any) => application.status === 'invited'));
                // setApplicationsList(applications);
            } else if (value === 2) {
                setApplicationsList(applications.filter((application: any) => application.status === 'rejected'));
                // setApplicationsList(applications);
            }
        }
    }, [applications, value]);

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

    type TableButton = {
        id: number;
        title: string;
        value: number;
        onClick: () => void;
    };

    const formatDate = (date: string): string => {
        const newDate = new Date(date);
        return `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
    };

    const tableButtons: TableButton[] = [
        {
            id: 1,
            title: isMobile ? localization[lang].appplications : localization[lang].allApplications,
            value: 0,
            onClick: () => setValue(0),
        },
        {
            id: 2,
            title: localization[lang].inviteds,
            value: 1,
            onClick: () => setValue(1),
        },
        {
            id: 3,
            title: localization[lang].rejecteds,
            value: 2,
            onClick: () => setValue(2),
        },
    ];

    const universities = {
        1: {
            'kz': 'КБТУ',
            'ru': 'КБТУ',
            'en': 'KBTU',
        },
        2: {
            'kz': 'АГП',
            'ru': 'АГП',
            'en': 'AGP',
        },
        3: {
            'kz':'Сатпаев Университет',
            'ru':'Сатпаев Университет',
            'en':'Satpaev University',
        },
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'var(--color-light-dark-100, #F4F7FE)',
            color: 'var(--color-light-dark-600, #58607C)',
            border: 0,
        },
        [`&.${tableCellClasses.body}`]: {
            // fontSize: '1rem',
            width: isMobile ? '65%' : '20%',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        '& > *': { 
            borderBottom: 'unset' 
        },
    }));

    const handleChangeStatus = (status: string, application_id: number): void => {
        dispatch(fetchStatus({ status, application_id }));
    };

    function handleApplicationClick(id: number): void {
        if (isMobile) {
            navigate(`/diploma/${id}/1`);
        }
    };

    React.useEffect(() => {
        dispatch(fetchApplications());
        console.log('applications', applications);
    }, [value]);

    return (
        <>
            {role === 'employer' ?
                (
                    <Box sx={{
                        display: 'flex',
                        padding: '1.75rem 2rem 2rem', width: '100%',
                        flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem',
                    }}>
                        <Typography sx={{
                            color: 'var(--color-light-dark-700, #293357)', fontSize: '1.5rem',
                            fontStyle: 'normal', fontWeight: 600, lineHeight: '125%',
                            display: 'flex', "@media (max-width: 778px)": { display: 'none' }
                        }}>
                            {localization[lang].appplications}
                        </Typography>
                        <Box sx={{
                            display: 'flex', paddingY: '1.75rem', flexDirection: 'column',
                            alignItems: 'flex-start', gap: '0.5rem', alignSelf: 'stretch',
                            borderRadius: '1.25rem', background: '#FFF',
                            '@media (max-width: 778px)': { paddingY: '1rem' }
                        }}>
                            <Typography sx={{
                                color: 'var(--color-light-dark-700, #293357)', fontSize: '1.375rem',
                                fontStyle: 'normal', fontWeight: 600, lineHeight: '125%',
                                display: 'none', "@media (max-width: 778px)": { display: 'flex' },
                                marginLeft: '1rem'
                            }}>
                                {localization[lang].appplications}
                            </Typography>
                            <Box sx={{
                                display: 'flex', paddingX: '1.75rem', alignItems: 'center',
                                gap: '1.25rem', alignSelf: 'stretch',
                                '@media (max-width: 778px)': { overflow: 'auto', scrollBehavior: 'smooth', flexWrap: 'nowrap', gap: '0.5rem', padding: '1rem' }
                            }}>
                                {
                                    tableButtons.map((button: TableButton) => (
                                        <MuiButton
                                            key={button.id}
                                            sx={{
                                                height: '2.5rem', padding: '0.5rem 1.5rem', borderRadius: "2.5rem",
                                                fontSize: '0.875rem', fontWeight: 500,
                                                backgroundColor: value === button.value ? "#3B82F6" : "#F4F7FE",
                                                color: value === button.value ? "white" : "#293357",
                                                '&:hover': {
                                                    backgroundColor: value === button.value ? "#1565C0" : "#f0f0f0",
                                                },
                                                '@media (max-width: 778px)': {
                                                    fontSize: '0.75rem', height: '2rem', padding: '0.5rem 0.75rem',
                                                },
                                            }}
                                            onClick={button.onClick}
                                        >
                                            {button.title}
                                        </MuiButton>
                                    ))
                                }
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <TableContainer
                                    sx={{
                                        maxHeight: '100%',
                                    }}
                                >
                                    <Table
                                        sx={{
                                            width: '100%',
                                        }}
                                        stickyHeader
                                        aria-label="sticky table"
                                        // aria-label="collapsible table"
                                    >
                                        <TableHead >
                                            <TableRow>
                                                <StyledTableCell size={isMobile ? 'small' : 'medium'} sx={{
                                                    '@media (max-width: 778px)': { fontSize: '0.75rem' }, fontSize: '0.75rem'
                                                }}>
                                                    {localization[lang].fullname}
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' sx={{
                                                    "@media (max-width: 778px)": { display: 'none' }, fontSize: '0.75rem',
                                                }}>
                                                    {localization[lang].speciality}
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center" sx={{
                                                    "@media (max-width: 778px)": { display: 'none' }, fontSize: '0.75rem'
                                                }}>
                                                    {localization[lang].graduationYear}
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center" sx={{
                                                    "@media (max-width: 778px)": { display: 'none' }, fontSize: '0.75rem'
                                                }}>
                                                    GPA
                                                </StyledTableCell>
                                                <StyledTableCell size={isMobile ? 'small' : 'medium'} align={isMobile ? 'right' : 'center'}
                                                    sx={{ '@media (max-width: 778px)': { fontSize: '0.75rem' }, fontSize: '0.75rem' }}
                                                >
                                                    {localization[lang].date}
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center" sx={{
                                                    "@media (max-width: 778px)": { display: 'none' }, fontSize: '0.75rem',
                                                }}>
                                                    {value === 0 ? 'Пригласить' : 'Статус'}
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                applicationsList && applicationsList.map((application: any) => (
                                                    <>
                                                    <StyledTableRow key={application.id} onClick={(): void => { handleApplicationClick(application.diploma_id); }}>
                                                        <StyledTableCell size='medium' sx={{ '@media (max-width: 778px)': { fontSize: '0.875rem' }, }}>
                                                            {'ФИО'}
                                                            <Typography sx={{
                                                                display: 'none',
                                                                '@media (max-width: 778px)': { display: 'block' },
                                                                fontSize: '0.75rem', fontWeight: 400, color: '#9499AB',
                                                            }}>
                                                                {
                                                                    application &&
                                                                        application.university_id &&
                                                                        universities[application.university_id as keyof typeof universities] ?
                                                                        universities[application.university_id as keyof typeof universities][lang] : 'Университет!' 
                                                                }
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' sx={{
                                                            "@media (max-width: 778px)": { display: 'none' },
                                                        }}>
                                                            {application && application.speciality_ru ? application.speciality_ru : 'Специализация'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center" sx={{
                                                            "@media (max-width: 778px)": { display: 'none' },
                                                        }}>
                                                            {application && application.year ? application.year : 'Год'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center" sx={{
                                                            "@media (max-width: 778px)": { display: 'none' },
                                                            }}
                                                            onClick={()=>{setOpenStudentInfo(!openStudentInfo)}}
                                                        >
                                                            {application && application.gpa ? application.gpa : 'GPA'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align={isMobile ? 'right' : 'center'}
                                                            sx={{ '@media (max-width: 778px)': { fontSize: '0.75rem' }, }}
                                                        >
                                                            {application && application.created_at ? formatDate(application.created_at) : 'Дата'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center" sx={{
                                                            "@media (max-width: 778px)": { display: 'none' },
                                                        }}>
                                                            {
                                                                application && application.status && application.status === 'processing' ?
                                                                    (
                                                                        <Box sx={{
                                                                            display: 'flex', paddingY: '0.25rem', alignItems: 'center',
                                                                            gap: '0.625rem', alignSelf: 'stretch', justifyContent: 'center',
                                                                        }}>
                                                                            <Box
                                                                                sx={{
                                                                                    height: '2.5rem', width: '2.5rem', borderRadius: "0.625rem",
                                                                                    backgroundColor: "#FDECEC", justifyContent: 'center', alignItems: 'center',
                                                                                    flexShrink: 0, display: 'flex', cursor: 'pointer',
                                                                                    '&:hover': {
                                                                                        backgroundColor: "#FDD9D9",
                                                                                    }
                                                                                }}
                                                                                onClick={(): void => { application && application.id ? handleChangeStatus('rejected', application.id) : null; }}
                                                                            >
                                                                                <Reject />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    height: '2.5rem', width: '2.5rem', borderRadius: "0.625rem",
                                                                                    backgroundColor: "#3B82F6", justifyContent: 'center', alignItems: 'center',
                                                                                    flexShrink: 0, display: 'flex', cursor: 'pointer',
                                                                                    '&:hover': {
                                                                                        backgroundColor: "#1565C0",
                                                                                    }
                                                                                }}
                                                                                onClick={(): void => { application && application.id ? handleChangeStatus('invited', application.id) : null; }}
                                                                            >
                                                                                <Invite />
                                                                            </Box>
                                                                        </Box>
                                                                    ) :
                                                                    <Box
                                                                        sx={{
                                                                            borderRadius: '1.25rem', paddingX: '0.75rem', paddingY: '0.3rem',
                                                                            fontSize: '0.75rem',
                                                                            background: application && application.status &&
                                                                                application.status === 'processing' ? '#EBF2FE' :
                                                                                application.status === 'rejected' ? '#FDECEC' :
                                                                                    application.status === 'invited' ? '#E9F9EF' : '#EBF2FE',
                                                                            color: application && application.status &&
                                                                                application.status === 'processing' ? '#3B82F6' :
                                                                                application.status === 'rejected' ? '#EF4444' :
                                                                                    application.status === 'invited' ? '#22C55E' : '#3B82F6',
                                                                        }}>
                                                                        {application && application.status ? statuses[application.status as keyof typeof statuses][lang] : 'Статус'}
                                                                    </Box>
                                                            }
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                            <Collapse in={openStudentInfo} timeout="auto" unmountOnExit>
                                                                <StudentInfo student={{name: 'syrym'}}/>
                                                            </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                    </>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                ) :
                (
                    <Box sx={{
                        display: 'flex',
                        padding: '1.75rem 2rem 2rem', width: '74rem',
                        flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem',
                        '@media (max-width: 778px)': { width: '100%', padding: '1.5rem 1rem', gap: '1.25rem' },
                    }}>
                        <Typography sx={{
                            color: 'var(--color-light-dark-700, #293357)', fontSize: '1.5rem',
                            fontStyle: 'normal', fontWeight: 600, lineHeight: '125%',
                        }}>
                            {isMobile ? localization[lang].job : localization[lang].myApplications}
                        </Typography>

                        <Box sx={{
                            display: 'none',
                            '@media (max-width: 778px)': {
                                display: 'flex', width: '100%', padding: '0.25rem',
                                justifyContent: 'center', alignItems: 'center',
                                borderRadius: '3rem', background: '#FFF'
                            },
                        }}>
                            <MuiButton
                                fullWidth
                                sx={{
                                    backgroundColor: "#white", color: "#293357", borderRadius: '3rem',
                                    '&:hover': { backgroundColor: "#f0f0f0", },
                                }}
                                onClick={(): void => navigate('/employer')}
                            >
                                {localization[lang].employers}
                            </MuiButton>
                            <MuiButton fullWidth sx={{
                                backgroundColor: "#3B82F6", color: "white", borderRadius: '3rem',
                                '&:hover': { backgroundColor: "#1565C0", },
                            }}>
                                {localization[lang].myApplications}
                            </MuiButton>
                        </Box>

                        <Box sx={{
                            display: 'flex', padding: 'var(--atmr-spacing-none)',
                            alignItems: 'flex-start', gap: '1.25rem', alignSelf: 'stretch',
                        }}>
                            {/* <Box sx={{
                                // width: '22.5rem', 
                                // height: '32.75rem', 
                                borderRadius: '1rem', background: 'var(--Color-Neutral-50, #FFF)',
                            }}>
                            </Box> */}

                            <Box sx={{
                                display: 'flex', padding: 'var(--atmr-spacing-none)',
                                flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', flex: '1 0 0',
                            }}>
                                <Box sx={{
                                    display: 'flex', padding: 'var(--atmr-spacing-none)',
                                    flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', alignSelf: 'stretch',
                                }}>
                                    {
                                        applications && applications.map((application: any) => (
                                            <Box key={application.id} sx={{
                                                display: 'flex', padding: '1.5rem',
                                                alignItems: 'flex-start', gap: '1.25rem', alignSelf: 'stretch',
                                                borderRadius: '1rem', background: 'var(--Color-Neutral-50, #FFF)',
                                            }}>
                                                <Box sx={{
                                                    display: 'flex', padding: 'var(--atmr-spacing-none)', flexDirection: 'column',
                                                    alignItems: 'flex-start', gap: '0.75rem', flex: '1 0 0',
                                                }}>
                                                    <Typography sx={{
                                                        flex: '1 0 0', color: 'var(--color-light-dark-700, #293357)',
                                                        fontSize: '1.25rem', fontStyle: 'normal', fontWeight: 600, lineHeight: '120%',
                                                    }}>
                                                        {application && application.employer_name ? application.employer_name : 'Название компании'}
                                                    </Typography>
                                                    <Typography sx={{
                                                        flex: '1 0 0', color: 'var(--color-light-dark-600, #58607C)',
                                                        fontSize: '1rem', fontStyle: 'normal', fontWeight: 400, lineHeight: '125%',
                                                    }}>
                                                        {application && application.speciality ? application.speciality : 'Специальность'}
                                                    </Typography>
                                                    <Typography sx={{
                                                        flex: '1 0 0', color: 'var(--color-light-dark-600, #58607C)',
                                                        fontSize: '1rem', fontStyle: 'normal', fontWeight: 400, lineHeight: '125%',
                                                    }}>
                                                        {application && application.field ? application.field : 'Область'}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            borderRadius: '1.25rem', paddingX: '0.75rem', paddingY: '0.3rem',
                                                            fontSize: '0.75rem',
                                                            background: application && application.status &&
                                                                application.status === 'processing' ? '#EBF2FE' :
                                                                application.status === 'rejected' ? '#FDECEC' :
                                                                    application.status === 'invited' ? '#E9F9EF' : '#EBF2FE',
                                                            color: application && application.status &&
                                                                application.status === 'processing' ? '#3B82F6' :
                                                                application.status === 'rejected' ? '#EF4444' :
                                                                    application.status === 'invited' ? '#22C55E' : '#3B82F6',
                                                        }}>
                                                        {application && application.status ? statuses[application.status as keyof typeof statuses][lang] : 'Статус'}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                )}
        </>
    );
};