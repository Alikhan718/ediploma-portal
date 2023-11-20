import React from 'react';
import { Typography, Box, Container } from "@mui/material";
import { Button } from "@src/components"
import not from "@src/assets/dashboard/notFound.png"
import { useNavigate } from 'react-router';
import { routes } from "@src/shared/routes";

const NotFoundPageLayout: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Container style={{ textAlign: 'center' }}>
			<img
				src={not}
				alt="Centered Image"
				style={{ marginBottom: '20px' }}
			/>
			<Box>
				<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '3rem', color: '#3B82F6' }}>
					Страница не найдена
				</Typography>
				<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '1rem', color: '#818181' }}>
					Неправильно набран адрес или такой страницы не существует
				</Typography>
			</Box>
			<Box sx={{ marginTop: '1rem' }}>
				<Button variant="outlined" onClick={() => {
					navigate(routes.main);
				}} sx={{ marginRight: '6rem', borderRadius: '2rem' }}>Вернуться назад</Button>
				<Button variant="contained" onClick={() => {
					navigate(routes.main);
				}} sx={{ borderRadius: '2rem', width: '18%' }}>На главную</Button>
			</Box>
		</Container >
	);
};

export default NotFoundPageLayout;
