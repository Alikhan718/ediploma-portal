import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnalyticsCard } from './components/AnalyticsCard';
import { FacultyGraph } from './components/FacultyGraph';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { CitiesGraph } from './components/CitiesGraph';
import { GenderGraph } from './components/GenderGraph';
import { CitiesGrantsGraph } from './components/CitiesGrantsGraph';
import { GrantsGraph } from './components/GrantsGraph';

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
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Box pr={3} pt={2}>
				<Typography>{children}</Typography>
			</Box>
		</div>
	);
}

export const AnalysisPage: React.FC = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', margin: '2rem' }}>
			<TabPanel value={value} index={1}>
				<Box sx={{ marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 600 }}>Аналитика</Box>
				<Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
					<Box sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: "24px",
						marginBottom: '35px',
						'@media (max-width: 1335px)': {
							'& > div': {
								width: '48%'
							},
							justifyContent: 'space-between',
							marginRight: '2%'
						},
						'@media (max-width: 700px)': {
							'& > div': {
								width: '98%'
							},
							marginRight: 0
						},
					}}>
						<AnalyticsCard text="Количество выпускников" number={5532} />
						<AnalyticsCard text="Выпускники бакалавриата" number={2823} />
						<AnalyticsCard text="Выпускники магистратуры" number={1987} />
					</Box>
					<Box sx={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "start",
						marginBottom: "32px",
						'@media (max-width: 1335px)': {
							flexDirection: "column",
							gap: "32px"
						}
					}}>
						<Box sx={{
							flex: 3,
							display: "flex",
							gap: "32px",
							flexDirection: "column"
						}}>
							<FacultyGraph />
							{/* <AnalyticsGraph /> */}
							<GenderGraph />
						</Box>
						<Box sx={{
							flex: 1,
							display: "flex",
							gap: "32px",
							flexDirection: "column",
							'@media (max-width: 1335px)': {
								flexDirection: "row"
							},
							'@media (max-width: 700px)': {
								flexDirection: "column",
								width: "100%",
								'& > div': {
									maxWidth: "100%"
								}
							}
						}}>
							<CitiesGraph />
							<CitiesGrantsGraph />
							<GrantsGraph />
						</Box>
					</Box>

				</Box>
			</TabPanel>
		</Box>
	);
}


export default AnalysisPage;