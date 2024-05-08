import React from 'react';
import {Box, CardContent, Typography} from "@mui/material";
import styles from "@src/pages/EmployersListPage/EmployersListPage.module.css";
import { Button, } from '@src/components';

interface EmployerCardProps {
    employer: {
        id: number;
        university_id: number;
        year: number;
        name: string;
        name_kz: string;
        name_en: string;
        field: string;
        region: string;

    };
    lang: 'kz' | 'ru' | 'en';
    handleCardClick: (id: number) => void;
}

const EmployerCard: React.FC<EmployerCardProps> = ({ employer, lang, handleCardClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <CardContent
                key={employer.id + "content"}
                sx={{
                    flex: '1',
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "space-between"
                }}
                onClick={() => handleCardClick(employer.id)}
            >
                <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600" sx={{
                    "@media (max-width: 778px)": {
                        fontSize: '0.75rem'
                    },
                    "@media (max-width: 998px)": {
                        fontSize: '1rem'
                    },
                }}>
                    {employer.name}
                </Typography>
                <Typography fontSize="1rem" mb=".5rem" color="#818181" className={styles.mobTextSm}>
                    {employer.field ? employer.field : "Специальность"}
                </Typography>


                <Typography fontSize="1rem" mb=".8rem" color="#818181" className={styles.mobTextSm}>
                    Область
                </Typography>

                <Button buttonSize='m' variant='contained' borderRadius='40px' sx={{maxWidth:'150px', fontSize:'14px',}}>
                    Откликнуться
                </Button>

            </CardContent>
        </Box>
    );
};

export default EmployerCard;