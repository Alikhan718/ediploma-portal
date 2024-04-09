import React from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import { RatingDisplay } from '@src/components/RatingDisplay/RatingDisplay';
import { unis } from 'src/pages/DiplomaPage/generator';
import styles from "../DiplomaPage.module.css";

interface DiplomaCardProps {
    diploma: {
        id: number;
        university_id: number;
        year: number;
        name_ru: string;
        speciality_ru?: string;
        rating: number;
    };
    lang: 'kz' | 'ru' | 'en';
    handleCardClick: (id: number) => void;
}

const DiplomaCard: React.FC<DiplomaCardProps> = ({ diploma, lang, handleCardClick }) => {


    return (
        <Box
            sx={{
                display: 'flex',

            }}
        >
            <CardContent
                key={diploma.id + "content"}
                sx={{
                    flex: '1',
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "space-between",


                }}
                onClick={() => handleCardClick(diploma.id)}
                className={styles.cardConwtent}
            >
                <Box >
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography color="#818181" sx={{ fontWeight: '500', fontSize: '1rem' }}>
                            {unis[lang][diploma.university_id]}
                        </Typography>
                        <Typography fontSize="1rem" color="#818181">
                            {diploma.year}
                        </Typography>
                    </Box>
                    <Typography
                        mb='1rem'
                        mt='0.75rem'
                        fontSize="1.25rem"
                        className={styles.mobText}
                        fontWeight="600"
                    >
                        {diploma.name_ru}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        fontSize=".8rem"
                        mt="1rem"
                        color="#818181"
                        className={styles.mobTextSm}
                    >
                        {diploma.speciality_ru?.substring(
                            diploma.speciality_ru.search("«"),
                            diploma.speciality_ru.search("»") + 1
                        )}
                    </Typography>
                    {diploma.rating !== 0.0 && (
                        <Box display="flex" marginTop="0.5rem" alignItems="center">
                            <RatingDisplay academicRating={Number(diploma.rating)} />
                            <Box marginLeft='0.5rem'>{diploma.rating}</Box>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Box>
    );
};

export default DiplomaCard;
