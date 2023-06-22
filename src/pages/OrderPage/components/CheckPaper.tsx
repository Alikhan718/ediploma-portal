import React from 'react';
import { Collapse, Typography, Box } from '@mui/material';
import { Order } from '@src/store/orders/types';

interface CheckPaperProps {
	open: boolean;
	order: Order
}

export const CheckPaper: React.FC<CheckPaperProps> = (props) => {
	const { open, order } = props;

	console.log(order.items);

	return (
		<tr style={{ verticalAlign: 'top' }}>
			<td colSpan={2}>
				<Collapse in={open}>
					<Box p='20px 20px 20px 0' borderRight='1px solid #E8E8E9'>
						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Комментарии </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'>{order.comment} </Typography>
						</Box>
						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Уникальный ID </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'>{order.order_id} </Typography>
						</Box>

						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Способ доставки </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.delivery_fee} </Typography>
						</Box>
						<Box>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Имя клиента </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.customer.name} </Typography>
						</Box>
					</Box>
				</Collapse>
			</td>
			<td colSpan={3}>
				<Collapse in={open}>
					<Box p='20px 40px 20px 0' width='500px'>
						{order.items.map((item: any) =>
							<Box mb='40px' key={item.id} ml='10px'>
								<Box display='flex' alignItems='center' justifyContent='space-between'>
									<Typography mb='8px' variant='h4' fontWeight='600' noWrap> {item.quantity}x {item.name} </Typography>
									<Typography mb='8px' variant='h4' fontWeight='600' noWrap> {item.price} тг </Typography>
								</Box>
								<Box paddingLeft='30px'>
									<Typography color={'#656665'}> 
										2х Добавить кетчуп
									</Typography>
									<Typography color={'#656665'}>
										1х Добавить сырный соус
									</Typography>
								</Box>
							</Box>
						)}

					</Box>
				</Collapse>
			</td>
			<td colSpan={1}>
				<Collapse in={open}>
					<Box p='20px 40px 20px 0' borderLeft='1px solid #E8E8E9' paddingLeft='15px'>
						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Cтоимость заказа </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.total_price}  тг </Typography>
						</Box>
						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Доставка </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.delivery_fee || 0}  тг </Typography>
						</Box>
						<Box mb='40px'>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Скидка </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.discount || 0}  тг </Typography>
						</Box>
						<Box>
							<Typography mb='8px' variant='h4' fontWeight='600' noWrap> Итого </Typography>
							<Typography variant='h3' fontWeight='400' lineHeight='1.375em'> {order.total_price}  тг </Typography>
						</Box>
					</Box>
				</Collapse>
			</td>
		</tr>
	);
};