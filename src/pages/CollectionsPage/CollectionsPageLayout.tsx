import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/university.jpg";
import {Auth} from "aws-amplify";


export const CollectionsPageLayout: React.FC = () => {
    const onSignOut = (): void => {
		Auth.signOut();
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("currLocation");
	};

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='1rem'>
			<Button onClick={() => {
				onSignOut()
			}}>Logout</Button>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((e) => (
            <Card key={e} elevation={6} sx={{display: 'flex', width: "45%", borderRadius: "10px", marginBottom: "1.5rem"}} >
                <CardMedia
                    component="img"
                    sx={{width: "13rem"}}
                    image={exampleImage}
                    alt="University Image"
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                            Казахстанско-Британский
                            Технический Университет
                        </Typography>
                        <Typography mb='.5rem' fontSize="1rem" fontWeight="600" color={"#2EC4B6"}>
                            8 специальностей
                        </Typography>
                        <Box display='flex'>

                            <Typography fontSize="0.875rem" mt='-.1rem' fontWeight="700">
                                4.8
                            </Typography>
                            <StarIcon/>
                            <StarIcon/>
                            <StarIcon/>
                            <StarIcon/>
                            <StarIcon/>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            ))}
        </Box>

    );
};