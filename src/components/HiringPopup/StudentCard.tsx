import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface StudentCardProps{
    student: any;
};

export const StudentCard: React.FC<StudentCardProps> = (props) => {
    const { student } = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {student.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {student.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}