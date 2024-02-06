import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
            sx={{ maxWidth: 345 }}
        >
            <CardActionArea
                onClick={ () => {handleCardClick(student.id)} }
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {student.name_ru}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {student.speciality_ru}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
            <IconButton
                sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#D8E6FD",
                    "@media (max-width: 778px)": {
                        display: 'none'
                    }
                }}
                onClick={handleToogleFavoriteDiplomas}>
                <FavoriteDiploma fill={isFavorite ? "#3B82F6" : "white"}/>
            </IconButton>
        </Card>
    );
}