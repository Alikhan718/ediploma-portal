import React from 'react';
import { Box, CardContent, Link, Typography } from '@mui/material';
import { Button, Input, Label } from '@src/components';
import { IAuthLogin } from '@src/pages/AuthPage/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthDSRequest, fetchLoginRequest } from '@src/store/auth/actionCreators';
import { isAuthenticated } from '@src/utils/userAuth';
import * as NcaLayer from '@src/utils/functions';
import { routes } from '@src/shared/routes';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import Checkbox from '@mui/material/Checkbox';
import { enableWebSocket } from "@src/utils/functions";
import styles from "@src/pages/AuthPage/AuthPage.module.css";
import { selectUserRole } from "@src/store/auth/selector";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from "@src/pages/AuthPage/generator";


export const LoginPageLayout: React.FC = () => {
	const [state, setState] = React.useState<IAuthLogin>({
		email: '',
		password: '',
	});
	const lang = useSelector(selectLanguage);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();
		dispatch(fetchLoginRequest(state));

		// Track login event
		ReactGA.event({
			category: 'User',
			action: 'Login',
		});

		// Check authentication status after a delay to ensure the request has completed
		setTimeout(() => {
			const urlElements = window.location.href.split('/');
			if (isAuthenticated() && urlElements.includes('auth')) {
				navigate(routes.profile, { replace: true });
			}
		}, 2000);
	};

	React.useEffect(() => {
		enableWebSocket();
		const urlElements = window.location.href.split('/');
		if (isAuthenticated() && urlElements.includes('auth')) {
			navigate(routes.profile, { replace: true });
		}
	}, [localStorage.getItem('token')]);

	React.useEffect(() => {
		ReactGA.initialize('G-H12GFWB4FY');
		ReactGA.pageview(window.location.pathname + window.location.search);

		// Track cursor movements
		const handleMouseMove = (e: MouseEvent): void => {
			ReactGA.event({
				category: 'User',
				action: 'Cursor Move',
				label: `X: ${e.clientX}, Y: ${e.clientY}`,
			});
		};
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);
	const role = useSelector(selectUserRole);
	const authWithDS = (res: any) => {
		if (res['code'] === "200") {
			res = res['responseObject'];
			const subjectDn = res['subjectDn'];
			let dateTo = res['certNotAfter'];
			let dateFrom = res['certNotBefore'];
			const authorityKeyIdentifier = res['authorityKeyIdentifier'];
			const data = {
				'subjectDn': subjectDn,
				'dateTo': dateTo,
				'dateFrom': dateFrom,
				'authorityKeyIdentifier': authorityKeyIdentifier
			};
			dispatch(fetchAuthDSRequest(data));
			setTimeout(() => {
				const urlElements = window.location.href.split('/');
				if (isAuthenticated() && urlElements.includes('auth')) {
					navigate(routes.profile, { replace: true });
				}
			}, 2000);
		}
	};
	const ncaLayerAuth = () => {
		NcaLayer.getKeyInfo(authWithDS);
	};

	return (
		<>
			<Box>
				<Typography className={styles.textLg} fontWeight="700">
					{localization.signIn[lang]}

				</Typography>
				<Typography className={styles.textMd} color="#818181" width="17rem">
					{localization.EmailHint[lang]}
				</Typography>
			</Box>
			<form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
				<Box>
					<Label label="Почта*" />
					<Input
						type="text"
						name="email"
						onChange={handleChange}
						placeholder="Логин или Email"
					/>
				</Box>
				<Box>
					<Label label="Пароль*" />
					<Input
						type="password"
						name="password"
						onChange={handleChange}
						placeholder="Пароль"
					/>
				</Box>
				<Box display="flex" flex="row" justifyContent="space-between">
					<Box display="flex" flex="row">
						<Checkbox defaultChecked size="small" />
						<Typography alignSelf="center" className={styles.textMd} fontWeight="500" color="#2D2D2D">
							{localization.rememberMe[lang]}
						</Typography>
					</Box>
					<Link sx={{ textDecoration: 'none', fontWeight: '600' }} href={routes.passwordReset}
						alignSelf="center">
						<Typography fontWeight="500" className={styles.textMd}>
							{localization.forgotP[lang]}
						</Typography>
					</Link>
				</Box>
				<Button fullWidth={true} variant="contained" borderRadius="3rem" onClick={onSubmit} type="submit">
					{localization.signIn[lang]}
				</Button>
				<Button
					fullWidth={true}
					variant="contained"
					borderRadius="3rem"
					className={styles.mobDNone}
					sx={{
						backgroundColor: "#EBF2FE",
						color: "#2F69C7",
						"&:hover": {
							"background-color": "#3B82F6", color: "white"
						}
					}}
					onClick={() => {
						ncaLayerAuth();
					}}>
					{localization.selectEDS[lang]}
				</Button>
			</form>
			<Typography className={styles.textMd} textAlign="center" mt="1rem">
				{localization.notRegistered[lang]}{'  '}
				<Link sx={{ textDecoration: 'none', fontWeight: '600' }} href={routes.register}>
					{localization.createAccount[lang]}
				</Link>
			</Typography>
		</>

	);
};
