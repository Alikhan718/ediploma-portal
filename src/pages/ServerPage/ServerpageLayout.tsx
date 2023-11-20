import React from 'react';
import { Typography, Box, Container } from "@mui/material";
import { Button } from "@src/components"
import server from "@src/assets/dashboard/server.png"
import { useNavigate } from 'react-router';
import { routes } from "@src/shared/routes";

const ServerPageLayout: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Container style={{ textAlign: 'center' }}>
			<img
				src={server}
				alt="Centered Image"
				style={{ marginBottom: '20px' }}
			/>
			<Box>
				<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '3rem', color: '#3B82F6' }}>
					Ошибка сервера
				</Typography>
				<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '1rem', color: '#818181' }}>
					Попробуйте перезагрузить страницу. Мы прилагаем все усилия, чтобы исправить ошибку				</Typography>
			</Box>
			<Box sx={{ marginTop: '1rem' }}>
				<Button variant="outlined" onClick={() => {
					navigate(routes.main);
				}} sx={{ marginRight: '6rem', borderRadius: '2rem' }}>Подробности</Button>
				<Button variant="contained" onClick={() => {
					navigate(routes.main);
				}} sx={{ borderRadius: '2rem', width: '18%' }}>Обновить</Button>
			</Box>
		</Container >
	);
};

export default ServerPageLayout;
