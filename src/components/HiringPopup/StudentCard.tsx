import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea, IconButton } from '@mui/material';
import {isAuthenticated} from "@src/utils/userAuth";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '@src/store/auth/selector';
import { selectFavoriteDiplomas, selectToogleFavoriteDiplomas } from '@src/store/diplomas/selectors';
import { fetchFavoriteDiplomas, fetchToogleFavoriteDiplomas } from '@src/store/diplomas/actionCreators';
import { ReactComponent as FavoriteDiploma } from '@src/assets/icons/favoriteDiploma.svg';

interface StudentCardProps{
    student: any;
    setAlertOpen: any;
};

export const StudentCard: React.FC<StudentCardProps> = (props) => {
    const { student, setAlertOpen } = props;
    const role = useSelector(selectUserRole);
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleCardClick = (counter: number) => {
        if (role === 'Student') {
            setAlertOpen(true);
            return;
        }

        isAuthenticated() && window.open(`/diploma/${student.id}/1`, '_blank');
    };

    const initialFavDiplomas = useSelector(selectFavoriteDiplomas);
    React.useEffect(() => {
        dispatch(fetchFavoriteDiplomas());

        if (initialFavDiplomas) {
            setIsFavorite(initialFavDiplomas.some((item: { id: number }) => item.id === Number(student.id)));
        }
    }, [])


    const favoriteDiplomas = useSelector(selectToogleFavoriteDiplomas);
    React.useEffect(() => {
        if (favoriteDiplomas) {
            setIsFavorite(favoriteDiplomas.some((item: { id: number }) => item.id === Number(student.id)));
        }
    }, [favoriteDiplomas]);

    const handleToogleFavoriteDiplomas = async () => {
        dispatch(fetchToogleFavoriteDiplomas({diploma_id: student.id}));
    };

    return (
        <Card
            sx={{ display: 'flex', width: '19.5rem', padding: '0.75rem', borderRadius: '1.25rem', height: '100%' }}
        >
            <CardActionArea
                onClick={ () => {handleCardClick(student.id)} }
            >
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem'}}>
                      <Typography gutterBottom component="div" sx={{fontSize: '1.25rem', fontWeight:600, textAlign: 'left'}}>
                          {student.name_ru}
                      </Typography>
                      <IconButton
                          sx={{ width: "2.5rem", height: "2.5rem",backgroundColor: 'transparent'}}
                          onClick={handleToogleFavoriteDiplomas}
                      >
                          <FavoriteDiploma fill={isFavorite ? "#3B82F6" : "#D8E6FD"}/>
                      </IconButton>
                    </Box>
                    <Typography color="text.secondary" sx={{fontSize: '1rem', fontWeight:400, textAlign: 'left'}}>
                        {student.speciality_ru}
                    </Typography>

                </CardContent>
            </CardActionArea>

        </Card>
    );
}
