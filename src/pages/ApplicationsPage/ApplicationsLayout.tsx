import React from 'react';
import { Box, Typography, Button as MuiButton, Table, TableBody, Paper, TableContainer } from '@mui/material';
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

export const ApplicationsLayout: React.FC = () => {
    const dispatch = useDispatch();
    const role = useSelector(selectUserRole).toLowerCase();
    const applications: any = useSelector(selectApplications);
    const [applicationsList, setApplicationsList] = React.useState<any[]>(applications);
    const [value, setValue] = React.useState<number>(0);

    React.useEffect(() => {
        if (applications) {
            if (value === 0) {
                setApplicationsList(applications);
            } else if (value === 1) {
                setApplicationsList(applications.filter((application: any) => application.status === 'invited'));
            } else if (value === 2) {
                setApplicationsList(applications.filter((application: any) => application.status === 'rejected'));
            }
        }
    }, [applications, value]);

    const myApplications = [
        {
            id: 1,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'processing',
            university: 'Сатпаев Университет',
            year: '2023',
            gpa: '3.5',
            date: '12.12.2021',
        },
        {
            id: 2,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'rejected',
            university: 'Сатпаев Университет',
            year: '2023',
            gpa: '3.5',
            date: '12.12.2021',
        },
        {
            id: 3,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'invited',
            university: 'Сатпаев Университет',
            year: '2023',
            gpa: '3.5',
            date: '12.12.2021',
        },
    ];

    const statuses = {
        processing: 'Не просмотрено',
        rejected: 'Отклонено',
        invited: 'Приглашен',
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
            title: 'Все заявки',
            value: 0,
            onClick: () => setValue(0),
        },
        {
            id: 2,
            title: 'Приглашенные',
            value: 1,
            onClick: () => setValue(1),
        },
        {
            id: 3,
            title: 'Отказанные',
            value: 2,
            onClick: () => setValue(2),
        },
    ];

    const universities = {
        1: 'КБТУ',
        2: 'АГП',
        3: 'Сатпаев Университет',
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'var(--color-light-dark-100, #F4F7FE)',
            color: 'var(--color-light-dark-600, #58607C)',
            border: 0,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: '1rem',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        // '&:nth-of-type(odd)': {
        //     backgroundColor: 'var(--color-light-dark-50, #FAFBFF)',
        // },
        // '&:nth-of-type(even)': {
        //     backgroundColor: 'var(--color-light-dark-50, #FAFBFF)',
        // },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        th: {
            // border: 0,
        },
    }));

    const handleChangeStatus = (status: string, application_id: number): void => {
        dispatch(fetchStatus({ status, application_id }));
    };

    React.useEffect(() => {
        dispatch(fetchApplications());
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
                        }}>
                            Заявки
                        </Typography>
                        <Box sx={{
                            display: 'flex', paddingY: '1.75rem', flexDirection: 'column',
                            alignItems: 'flex-start', gap: '1rem', alignSelf: 'stretch',
                            borderRadius: '1.25rem', background: '#FFF',
                        }}>
                            <Box sx={{
                                display: 'flex', paddingX: '1.75rem', alignItems: 'center',
                                gap: '1.25rem', alignSelf: 'stretch',
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
                                                }
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
                                    >
                                        <TableHead >
                                            <TableRow>
                                                <StyledTableCell size='medium'>
                                                    Специализация
                                                </StyledTableCell>
                                                <StyledTableCell size='medium'>
                                                    Название университета
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center">
                                                    Год выпуска
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center">
                                                    GPA
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center">
                                                    Дата отклика
                                                </StyledTableCell>
                                                <StyledTableCell size='medium' align="center">
                                                    Пригласить
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                applicationsList && applicationsList.map((application: any) => (
                                                    <StyledTableRow key={application.id}>
                                                        <StyledTableCell size='medium'>
                                                            {application && application.speciality_ru ? application.speciality_ru : 'Специализация'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium'>
                                                            {
                                                                application &&
                                                                    application.university_id &&
                                                                    universities[application.university_id as keyof typeof universities] ?
                                                                    universities[application.university_id as keyof typeof universities] : 'Университет'
                                                            }
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center">
                                                            {application && application.year ? application.year : 'Год'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center">
                                                            {application && application.gpa ? application.gpa : 'GPA'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center">
                                                            {application && application.created_at ? formatDate(application.created_at) : 'Дата'}
                                                        </StyledTableCell>
                                                        <StyledTableCell size='medium' align="center">
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
                                                                    onClick={() => { application && application.id ? handleChangeStatus('rejected', application.id) : null }}
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
                                                                    onClick={() => { application && application.id ? handleChangeStatus('invited', application.id) : null }}
                                                                >
                                                                    <Invite />
                                                                </Box>
                                                            </Box>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
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
                    }}>
                        <Typography sx={{
                            color: 'var(--color-light-dark-700, #293357)', fontSize: '1.5rem',
                            fontStyle: 'normal', fontWeight: 600, lineHeight: '125%',
                        }}>
                            Мои отклики
                        </Typography>

                        <Box sx={{
                            display: 'flex', padding: 'var(--atmr-spacing-none)',
                            alignItems: 'flex-start', gap: '1.25rem', alignSelf: 'stretch',
                        }}>
                            <Box sx={{
                                // width: '22.5rem', 
                                // height: '32.75rem', 
                                borderRadius: '1rem', background: 'var(--Color-Neutral-50, #FFF)',
                            }}>
                            </Box>

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
                                                        {application && application.status ? statuses[application.status as keyof typeof statuses] : 'Статус'}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
        </>
    );
};