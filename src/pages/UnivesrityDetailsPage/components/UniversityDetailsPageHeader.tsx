import React from 'react';
import {Box, Card, CardMedia, Typography} from "@mui/material";
import exampleImage from "@src/assets/example/kbtu_back.jpg";
import exampleIcon from "@src/assets/example/kbtu_min.jpg";

export const UniversityDetailsPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box display='flex' sx={{position: "relative"}} width={'100%'} mb='3rem'>
                <img src={exampleImage}
                     style={{width: "100%", height: "20rem", objectFit: "cover", objectPosition: "0 50%"}} alt=""/>
                <Card elevation={6}
                      sx={{
                          position: "absolute",
                          bottom: "-1rem",
                          left: "2rem",
                          borderRadius: "1rem",
                          padding: ".4rem"
                      }}>
                    <CardMedia
                        component="img"
                        sx={{width: "10rem", borderRadius: ".5rem"}}
                        image={exampleIcon}
                        alt="University Image"
                    />
                </Card>
            </Box>

        </React.Fragment>
    );
};
