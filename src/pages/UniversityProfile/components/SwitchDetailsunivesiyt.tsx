import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Chip, Link, useMediaQuery } from "@mui/material";
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import SmartContractIcon from "@src/assets/icons/contractIcon.png";
import { ReactComponent as EtherScanIcon } from "@src/assets/icons/Etherscan.svg";
import styles from "../UniversityProfile.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectGraduateAttributes } from "@src/store/diplomas/selectors";
import { isAuthenticated } from "@src/utils/userAuth";
import { Button, Modal } from "@src/components";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import { routes } from "@src/shared/routes";
import { useNavigate } from "react-router-dom";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{}}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export const SwitchDetailsUniversity: React.FC = () => {
	const lang = useSelector(selectLanguage);
	const [value, setValue] = React.useState(0);
	const [openModal, setOpenModal] = React.useState(false);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		if (newValue == 1 && !isAuthenticated()) {
			setOpenModal(true);
		} else {
			setValue(newValue);
		}
	};
	const graduateAttributes = useSelector(selectGraduateAttributes);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (

		<Box sx={{ width: '100%', marginRight: '30px' }}>
			<Modal
				open={openModal}
				handleClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

					<img src={NeedAuthorizationPic} alt="" />
					<Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
						fontWeight='600'
						variant="h6"
						component="h2">
						Для использования требуется авторизация
					</Typography>
					<Button variant='contained' sx={{
						marginTop: "1rem",
						padding: "1rem",
						width: "80%",
						fontSize: "1rem",
						fontWeight: "600",
						borderRadius: "2rem"
					}} onClick={() => {
						navigate(routes.login);
					}}>Авторизоваться</Button>
				</Box>
			</Modal>
			<Box width="50%" display="flex" flex="row" p=".275rem " sx={{
				borderRadius: "3rem",
				'@media (max-width: 778px)': {
					width: '100%', padding: '0'
				},
			}}>
				<Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} >
					{localization[lang].MainCard.diploma} </Box>


			</Box>



		</Box >
	);
}