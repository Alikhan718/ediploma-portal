import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Chip, Link, useMediaQuery } from "@mui/material";
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import SmartContractIcon from "@src/assets/icons/contractIcon.png";
import { ReactComponent as EtherScanIcon } from "@src/assets/icons/Etherscan.svg";
import styles from "../DiplomaDetailsPage.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectGraduateAttributes } from "@src/store/diplomas/selectors";
import { isAuthenticated } from "@src/utils/userAuth";
import { Button, Modal } from "@src/components";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import { routes } from "@src/shared/routes";
import { useNavigate } from "react-router-dom";
import {selectLanguage} from "@src/store/generals/selectors";
import { localization } from '@src/pages/DiplomaDetailsPage/generator';

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

export const SwitchDetails: React.FC = () => {
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
	const getQueryWidth = () => {
		const matchesLg = useMediaQuery('(min-width:1200px)');
		const matchesMd = useMediaQuery('(max-width:1180px)');
		const matchesSm = useMediaQuery('(max-width:768px)');
		const matchesXs = useMediaQuery('(max-width:576px)');
		if (matchesXs) return "80%";
		if (matchesSm) return "60%";
		if (matchesMd) return "40%";
		if (matchesLg) return "25%";
	};
	return (

		<Box sx={{ width: '100%', marginRight: '30px' }}>
			<Modal
				open={openModal}
				handleClose={() => setOpenModal(false)}
				maxWidth={getQueryWidth()}
				width={getQueryWidth()}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

					<img src={NeedAuthorizationPic} alt="" />
					<Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
						fontWeight='600'
						variant="h6"
						component="h2">
						{localization[lang].Modal.msg}
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
					}}>{localization[lang].Modal.authorize}</Button>
				</Box>
			</Modal>
			<Box width="50%" display="flex" flex="row" p=".275rem " sx={{
				backgroundColor: "#F8F8F8", borderRadius: "3rem",
				'@media (max-width: 778px)': {
					width: '100%'
				},
			}}>
				<Button fullWidth={true} variant="contained"
					color={value === 0 ? "primary" : "secondary"} borderRadius="3rem" onClick={(e) => handleChange(e, 0)}>
					{localization[lang].switchDetails.check}
				</Button>
				<Button fullWidth={true} color={value === 1 ? "primary" : "secondary"}
					variant="contained" borderRadius="3rem" onClick={(e) => handleChange(e, 1)}>
						{localization[lang].switchDetails.data}
				</Button>
			</Box>
			{/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Проверка" {...a11yProps(0)} />
					<Tab label="Данные" {...a11yProps(1)} />
				</Tabs> */}
			<TabPanel value={value} index={0}>
				<Box display='flex' flexDirection="column" mb="1rem" mt="1rem">
					<Typography className={styles.textMd} fontWeight='700' fontSize={"1.5rem"} mb="1rem">
						{localization[lang].switchDetails.status}
					</Typography>
					<Chip
						sx={{
							width: '25%', backgroundColor: '#E9F9EF', border: 'none', borderRadius: '20px',
							'@media (max-width: 778px)': {
								width: '70%'
							},
						}}
						className={cn(styles.MobMt0, styles.mt02)}
						label={
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Typography className={cn(styles.textMd)} sx={{
									marginRight: '.5rem',
									color: '#22C55E', fontWeight: '600', paddingTop: '0.9rem', paddingBottom: '0.9rem'
								}}>
									{localization[lang].switchDetails.confirmed}
								</Typography>
								<SingleCheck style={{ color: '#22C55E' }} />
							</div>
						}
					/>

				</Box>
				<Box display='flex' flexDirection="column" mt='1rem'>
					<Link href={'https://etherscan.io/address/0xbac7239d8c4313a00ae1bcde567c1d78bfac84d7'}
						sx={{ textDecoration: "none" }} target={'_blank'}>
						<Box display='flex'>
							<Typography className={styles.textMd} fontWeight='600' mb="1rem" color='black' fontSize={"1rem"}>
								{localization[lang].switchDetails.seeEtherscan}
							</Typography>
						</Box>
					</Link>
					<Link href={'https://etherscan.io/address/0xbac7239d8c4313a00ae1bcde567c1d78bfac84d7#code'}
						sx={{ textDecoration: "none" }} target={'_blank'} mt='0.2rem'>
						<Box display='flex'>
							<Typography className={styles.textMd} fontWeight='600' color='black' fontSize={"1rem"}>
								{localization[lang].switchDetails.seeSmartContract}
							</Typography>
						</Box>
					</Link>
				</Box>
			</TabPanel >
			<TabPanel value={value} index={1}>
				<Box mt="1rem" >
					{graduateAttributes
						? graduateAttributes.map((data: any) => (
							<Typography
								key={data.label_en}
								sx={{
									marginBottom: "1rem",
									display: "block",
								}}
							>
								<span style={{ color: "#818181", fontSize: "16px" }}>{ lang === 'ru' ? data.label_ru: lang === 'en' ? data.label_en: lang === 'kz' ? data.label_kz: " "}:</span>{" "}
								<span style={{ fontWeight: '600', fontSize: "16px" }}>{data.value}:</span>{" "}
							</Typography>
						))
						: null}
				</Box>
			</TabPanel>
		</Box >
	);
}