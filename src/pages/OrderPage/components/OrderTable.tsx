import React from 'react';

import {
	Table, TableRow, TableHead,
	TableBody as MuiTableBody, Box, Chip, Typography
} from '@mui/material';

import { CheckPaper } from './CheckPaper';
import { delivery } from '../generator';
import { statusColors } from '@src/utils/getStatusColor';
import { statusTranslations } from '@src/utils/getStatusTranslation';
import { Button, TableCellBody, TableCellHead } from '@src/components';
import { ReactComponent as ArrowDownIcon } from '@src/assets/icons/arrowDown.svg';

import { OrderTableProps } from '../types';
import { Order } from '@src/store/orders/types';



export const OrderTable: React.FC<OrderTableProps> = (props) => {
	const { tableHead, tableBody, field, direction, onTableHeadCellClick } = props;


	return (
		<React.Fragment>
			<Table >
				<TableHead>
					<TableRow >
						{tableHead.map(th => (
							<TableCellHead align="left" key={th.id} >
								<Button
									size="small"
									variant='contained'
									color='neutral'
									onClick={() => onTableHeadCellClick(th.field, direction ? direction * -1 : 1)}
									endIcon={th.field === field ? direction === 1 ?
										<ArrowDownIcon style={{ transform: "rotate(180deg" }} /> : <ArrowDownIcon /> : <ArrowDownIcon />}
									sx={{ '&:hover': { boxShadow: 0, backgroundColor: "#DADADA" } }}>
									{th.content}
								</Button>
							</TableCellHead>
						))}
					</TableRow>
				</TableHead>

				<MuiTableBody sx={{ position: 'relative', }}>
					{tableBody.map((tr, index) => (<TableBody key={index} tr={tr} />))}
				</MuiTableBody>
			</Table>
			{!tableBody.length ? <Typography width="100%" height="50vh" display="flex" justifyContent="center" alignItems="center">У вас еще нет заказов</Typography> : null}
		</React.Fragment>
	);
};

interface TableBodyProps {
	tr: Order,
}


const TableBody: React.FC<TableBodyProps> = (props) => {
	const { tr } = props;

	const [showCheck, setShowCheck] = React.useState<boolean>(false);

	const handleShowCheck = (): void => {
		setShowCheck((prevState) => !prevState);
	};
	const date_time = new Date(tr.order_time * 1000).toLocaleString().split(",");
	date_time[0] = date_time[0].replaceAll(".", "/");
	const time_zone = new Date(tr.order_time * 1000).toTimeString().slice(9).split(' ')[0];

	return (
		<React.Fragment>
			<TableRow onClick={handleShowCheck} >
				{/* DATE TIME*/}
				<TableCellBody > {date_time[0]} {date_time[1]}</TableCellBody>
				{/* Location */}
				<TableCellBody  > {tr.delivery_address ? tr.delivery_address.label : "Empty"}</TableCellBody>
				{/* ID*/}
				<TableCellBody  >№{parseInt(tr.order_code)}</TableCellBody>

				{/* CANAL {GLOVO WOLT} */}
				<TableCellBody  >
					{delivery[tr.delivery_service] ? <img src={delivery[tr.delivery_service]} alt="delivery service"/> : tr.delivery_service}
				</TableCellBody>
				{/* STATUS */}
				<TableCellBody  >
					<Chip color={statusColors[String(tr.status)] || "info"} label={statusTranslations[tr.status] ? statusTranslations[tr.status].ru : tr.status} variant="outlined" />
				</TableCellBody>
				{/* BTN OPEN CLOSE */}
				<TableCellBody>
					<Box width='30px' height='30px' display="flex" justifyContent="center" alignItems="center" sx={{ transform: showCheck ? 'rotate(180deg)' : 'rotate(0)', backgroundColor: showCheck ? 'rgba(2, 95, 62, 0.1)' : '', borderRadius: '10px' }}>
						<ArrowDownIcon />
					</Box>
				</TableCellBody>
			</TableRow>
			<CheckPaper open={showCheck} order={tr} />
		</React.Fragment>
	);
};
