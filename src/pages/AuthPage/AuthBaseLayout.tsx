import React, { useState } from 'react';

import { Box, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { IAuthPageBase } from "@src/pages/AuthPage/types";
import { isAuthenticated } from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import BrandIconWhite from '@src/assets/icons/brand_white.svg';
import ModeIcon from '@src/assets/icons/Mode.svg';
import { ReactComponent as Web } from '@src/assets/auth/web.svg';
import RuFlag from '@src/assets/icons/RuFlag.svg';
import KzFlag from '@src/assets/icons/Flag.svg';
import EnFlag from '@src/assets/icons/EnFlag.svg';
import { routes } from "@src/shared/routes";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import { selectUserRole } from "@src/store/auth/selector";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from '@src/store/generals/actionCreators';
import cn from "classnames";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from "@src/pages/AuthPage/generator";

export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {
	const { children } = props;
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	React.useEffect(() => {
		const urlElements = window.location.href.split('/');

		if (isAuthenticated() && urlElements.includes('auth')) {
			navigate(routes.profile, { replace: true });
		}
	}, [userRole]);
	const lang = useSelector(selectLanguage);
	const [showDropdown, setShowDropdown] = useState<{ profile: boolean; lang: boolean }>({
		profile: false,
		lang: false
	});
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, dropDownType: string) => {
		setAnchorEl(event.currentTarget);
		setShowDropdown(prevState => ({
			...prevState,
			[dropDownType]: true,
			[dropDownType === 'lang' ? 'profile' : 'lang']: false,
		}));
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
		setShowDropdown({ profile: false, lang: false });
	};
	const handleFlagSelect = (language: string) => {
		dispatch(setLanguage(language));
		handleCloseMenu();
	};
	return (
		<Box className={styles.container}
			sx={{
				backgroundColor: "white",
			}}>
			<Box className={styles.navbar}>
				<img src={BrandIcon} className={cn(styles.brand, styles.navItemLg)} onClick={() => {
					navigate(routes.main);
				}} />
				<img src={ModeIcon} style={{ cursor: "pointer" }} className={styles.navItemLg} onClick={() => {
				}} />
				<IconButton
					style={{
						cursor: 'pointer',
						minHeight: '2.5rem',
						minWidth: '3rem'
					}}
					onClick={(event) => {
						handleOpenMenu(event, "lang");
					}}
				>
					{lang == 'ru' && <img src={RuFlag} alt="Russian" />}
					{lang == 'en' && <img src={EnFlag} alt="English" />}
					{lang == 'kz' && <img src={KzFlag} alt="Kazakh" />}
				</IconButton>
				<img src={BrandIconWhite} className={cn(styles.brand, styles.navItemSm)} onClick={() => {
					navigate(routes.main);
				}} />
				<Menu
					anchorEl={anchorEl}
					open={showDropdown.lang}
					onClose={handleCloseMenu}
				>
					<MenuItem onClick={() => handleFlagSelect('ru')} sx={{ fontSize: '1rem' }}>
						<img src={RuFlag} alt="Russian" style={{ marginRight: '0.5rem' }} />
						Русский
					</MenuItem>
					<MenuItem onClick={() => handleFlagSelect('en')} sx={{ fontSize: '1rem' }}>
						<img src={EnFlag} alt="English" style={{ marginRight: '0.5rem' }} />
						Англиский
					</MenuItem>
					<MenuItem onClick={() => handleFlagSelect('kz')} sx={{ fontSize: '1rem' }}>
						<img src={KzFlag} alt="French" style={{ marginRight: '0.5rem' }} />
						Казахский
					</MenuItem>
				</Menu>
			</Box>
			<Box className={styles.contentLeft}>
				<Box sx={{
					marginY: 'auto', borderRadius: '.8rem', padding: '.6rem', width: "30rem",
					'@media (max-width: 1000px)': {
						padding: '.8rem',
						width: 'inherit',
					}
				}}>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							width: '100%',
							borderRadius: "2rem",
							justifyContent: 'space-between',
							backgroundColor: "white",
							'@media (max-width: 1000px)': {
								padding: '2rem !important',
							}
						}}
					>
						{children}
					</CardContent>
				</Box>
			</Box>
			<Box className={styles.containerRight}>
			</Box>
			<Box className={styles.footerAuth}>
				<Typography fontSize="0.75rem">
					{localization.Copyright[lang]}
				</Typography>
				<Box display="flex" flex="row" width="35vw" className={styles.footerRightItemsMob}
					justifyContent="space-between" color="white">
					<Typography fontSize="0.75rem">
						{localization.PrivacyPolicy[lang]}
					</Typography>
					<Typography fontSize="0.75rem">
						{localization.UserAgreement[lang]}
					</Typography><Typography fontSize="0.75rem">
						{localization.Help[lang]}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

