import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Checkbox, Chip, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { Button, TableCellBody, TableCellHead } from '@src/components';

import { TableHoverRow } from '@src/components/TableRow/TableRow';
import PlusIcon from '@src/assets/icons/plus.png';
import { ReactComponent as GlovoIcon } from '@src/assets/icons/GLOVO.svg';
import { ReactComponent as WoltIcon } from '@src/assets/icons/WOLT.svg';
import { ReactComponent as ArrowDownIcon } from '@src/assets/icons/arrowDown.svg';
import { ReactComponent as DeleteIcon } from '@src/assets/icons/delete_outline.svg';
import { roles } from "@src/shared/roles";
import { MenuUploadStatusesColors, MenuUploadStatusesEnum } from '../generator';
import { Menu } from '@src/store/menulist/types';

interface MenuTableProps {
	tableHead: Array<{ id: number, content: React.ReactNode | string | null, sortName: string | null }>
	tableBody: Array<Menu>;
	selectedMenus: any[],
	handleSort: (sortName: string) => void;
	handleMenuItem: (tr: Menu, e: React.ChangeEvent<HTMLInputElement>) => void;
	onDeleteMenu: (menu_id: string) => void;
	available_uploads: any[] | null;
};

const deliver_services: { [index: string]: JSX.Element } = {
	"glovo": <GlovoIcon />,
	"wolt": <WoltIcon />
};

const hasPermission = (roleList: string[]) => {
	const userRoles = JSON.parse(localStorage.getItem("userRole") || '[]') || "";
	if (!userRoles) {
		return false;
	}
	return userRoles.some((i: any) => roleList.includes(i));
};

export const MenuTable: React.FC<MenuTableProps> = (props) => {
	const { tableBody, tableHead, handleSort, handleMenuItem, onDeleteMenu, available_uploads } = props;
	const navigate = useNavigate();

	const goToEditMenPage = (tr: Menu, e: React.MouseEvent<HTMLElement>): void => {
		const is_checkbox = (e.target as HTMLElement)
			.attributes.getNamedItem('type')
			?.nodeValue === 'checkbox';
		const nodename = (e.target as HTMLElement).nodeName;
		const is_delete_btn = nodename === 'BUTTON' || nodename === 'svg' || nodename === "path";
		if (!is_checkbox && !is_delete_btn) {
			navigate(`/app/menu/configure${tr.delivery == "Главное меню" ? "-iiko" : `/${tr.delivery.toLowerCase()}`}/${tr.menu_id}`);
		}
	};

	const handleClick = (sortName: string | null): void => {
		if (sortName !== null) {
			handleSort(sortName);
		}
	};

	const getFormattedDate = (date: any) => {
		return new Date(date).toLocaleDateString("en-GB");
	};

	const getAvailableCount = (aggregator_name: string): number => {
		const available_count = available_uploads?.filter(item => item.aggregator_name === aggregator_name)[0];		
		return available_count?.count;
	};


	const isChecked = (menu_id: string): boolean => props.selectedMenus.some(item => item.menu_id === menu_id);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCellHead />
					{tableHead.map(th => (
						<TableCellHead key={th.id}>
							{th.id !== 2
							? <Button
								onClick={() => handleClick(th.sortName)}
								endIcon={<ArrowDownIcon />}
								variant='contained'
								color='neutral'
								sx={{ '&:hover': { boxShadow: 'none', backgroundColor: '#DADADA' } }}
								>
									{th.content}
								</Button>
							: <Box width='82px'>
								<Typography>{th.content}</Typography>
							  </Box> 
							}
						</TableCellHead>
					))}
				</TableRow>
			</TableHead>
			<TableBody sx={{ margin: '10px', }}>
				{Array.isArray(tableBody) && tableBody.map((tr: Menu, index: number) => (
					<TableHoverRow
						sx={{
							filter: tr.is_deleted ? "grayscale(100%)" : "",
							opacity: tr.is_deleted ? "0.5" : "1"
						}}
						key={`${index}%${tr.menu_id}`}
						onClick={tr.is_deleted ? undefined : (e): void => goToEditMenPage(tr, e)}
					>
						<TableCellBody >
							<Checkbox disabled={tr.is_deleted} checked={isChecked(tr.menu_id)} onChange={(e): void => handleMenuItem(tr, e)} />
						</TableCellBody>
						<TableCellBody> {tr.name}</TableCellBody>
						<TableCellBody>
							<Typography color={getAvailableCount(tr.delivery) < 4 ? "red" : "green"}>
								{`${getAvailableCount(tr.delivery) ? getAvailableCount(tr.delivery) : 0}/5`}
							</Typography>
						</TableCellBody>
						<TableCellBody> {deliver_services[String(tr.delivery)] ? deliver_services[String(tr.delivery)] : tr.delivery}</TableCellBody>
						<TableCellBody> {getFormattedDate(new Date(tr.updated_at ?? ''))}</TableCellBody>
						<TableCellBody>
							<Alert sx={{ borderRadius: "10px", fontWeight: 600 }} severity={MenuUploadStatusesColors[tr.status || "info"] || "info"} >
								{MenuUploadStatusesEnum[String(tr.status)]}
							</Alert>


						</TableCellBody>
						<TableCellBody align='right'>
							{hasPermission(roles.menu_advanced) &&
								<Button disabled={tr.is_deleted} color="error" onClick={(): void => onDeleteMenu(tr.menu_id)}>
									{!tr.is_deleted ? <DeleteIcon />
										: <img src={PlusIcon} alt="" />
									}
								</Button>
							}
						</TableCellBody>
					</TableHoverRow>
				))}
			</TableBody>
		</Table>
	);
};
