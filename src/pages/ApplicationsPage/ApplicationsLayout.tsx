import React from 'react';
import { Box, Typography, Button as MuiButton } from '@mui/material';

export const ApplicationsLayout: React.FC = () => {
    const myApplications = [
        {
            id: 1,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'processing',
        },
        {
            id: 2,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'rejected',
        },
        {
            id: 3,
            name: 'Название компании',
            speciality: 'Специальность',
            field: 'Область',
            status: 'invited',
        },
    ];

    const statuses = {
        processing: 'Не просмотрено',
        rejected: 'Отклонено',
        invited: 'Приглашен',
    };

    return (
        <>
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
                                myApplications && myApplications.map((application) => (
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
                                                {application && application.name ? application.name : 'Название компании'}
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
                                            <MuiButton
                                                sx={{
                                                    borderRadius: '1.25rem', paddingX: '0.75rem', paddingY: '0.2rem',
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
                                            </MuiButton>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};