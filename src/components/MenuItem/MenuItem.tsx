import React from 'react';
import { Box, Typography } from '@mui/material';
import { MenuItemProps } from './MenuItem.props';
import { Link } from 'react-router-dom';

import GreenToolTip from '@src/assets/icons/tooltipGreen.png';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { menuItem, children, hanldeClickProduct } = props;
	const onClick = (): void => {

		hanldeClickProduct && hanldeClickProduct(menuItem.id, menuItem.is_available);

	};

	const formatedPrice = (price: number): string => {
		return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	};

	return (
		<Box

			p='15px 0'
			display='flex'
			alignItems='start'
			justifyContent='space-between'
			borderBottom='1px solid #E8E8E9'
			onClick={onClick}
		>

			<Box display='flex' alignItems={"start"} width='60%'>

				<img
					style={{
						width: '100%',
						maxWidth: '80px',
						height: "80px",
						display: 'block',
						borderRadius: '10px',
						marginRight: '10px',
					}}
					src={menuItem?.images ? menuItem?.images[0] : ''}
					alt='' />

				<Box ml=".5rem">
					<Typography variant='h4' fontWeight='600' mb='8px' display='flex' alignItems='center'>
						{menuItem?.name ? menuItem?.name[0].Value : ''}
						{!menuItem?.is_available
							? <Box paddingLeft='10px' display='flex' alignItems='center'>
								<img src={GreenToolTip} alt="GreenToolTipIcon" />
								<Typography color='#FD9F28' paddingLeft='10px'>{"{На стопе}"}</Typography>
							</Box>
							: ''}
					</Typography>
					<Typography variant='h3' fontWeight='400'> {menuItem?.description ? menuItem?.description[0].Value : ""} </Typography>
				</Box>
			</Box>
			<Box width="10%">
				<Typography fontSize="20px" fontWeight="600">Цена</Typography>
				<Typography fontSize="18px" fontWeight='400' mt="10px">

					{menuItem?.price ? formatedPrice(menuItem?.price[0].Value) : ''}

					{menuItem?.price ? menuItem?.price[0].CurrencyCode : ""}

				</Typography>
			</Box>

			<Box width="20%">
				{children}

			</Box>
		</Box>
	);
};
