import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnalyticsCard } from './components/AnalyticsCard';
import { Button } from '@src/components'
import { FacultyGraph } from './components/FacultyGraph';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { CitiesGraph } from './components/CitiesGraph';
import { GenderGraph } from './components/GenderGraph';
import { CitiesGrantsGraph } from './components/CitiesGrantsGraph';
import { GrantsGraph } from './components/GrantsGraph';
import facultyData from './components/data/faculty.json';
import cityData from './components/data/cities.json';
import regionData from './components/data/city.json';
import genderData from './components/data/gender.json';
import grtantsData from './components/data/grants.json';
import analysisData from './components/data/analytic.json'
import * as XLSX from 'xlsx';


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
const initialGraphVisibility: Record<string, boolean> = {
	"Количество выпускников": true,
	"Выпускники бакалавриата": true,
	"Выпускники магистратуры": true,
	"FacultyGraph": true,
	"GenderGraph": true,
	"CitiesGraph": true,
	"CitiesGrantsGraph": true,
	"GrantsGraph": true,
	"AnalyticsGraph": true,
};
interface GraphData {
	name: string;
}
interface AllGraphData {
	[key: string]: GraphData[];
}
export const AnalysisPage: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const [graphVisibility, setGraphVisibility] = React.useState(initialGraphVisibility);
	const toggleGraphVisibility = (graphName: string) => {
		setGraphVisibility((prevVisibility) => ({
			...prevVisibility,
			[graphName]: !prevVisibility[graphName],
		}));
	};
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const handleDownloadData = () => {
		const allJsonData: AllGraphData = {
			facultyGraph: facultyData,
			genderGraph: genderData,
			citiesGraph: cityData,
			regionGraph: regionData,
			grantsGraph: grtantsData,
			analyticsGraph: analysisData,
		};

		const wb = XLSX.utils.book_new();
		Object.keys(allJsonData).forEach(graphName => {
			const jsonData = allJsonData[graphName];
			const ws = XLSX.utils.json_to_sheet(jsonData);
			XLSX.utils.book_append_sheet(wb, ws, graphName);
		});

		XLSX.writeFile(wb, 'graphs_data.xlsx');
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', margin: '2rem' }}>
			<TabPanel value={value} index={1}>
				<Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Box sx={{
						marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 600,
						'@media (max-width: 778px)': {
							fontSize: '1.2rem',
						},
					}}>Аналитика</Box>
					<Button variant='contained' onClick={handleDownloadData}
						sx={{
							borderRadius: '2rem', marginBottom: '1rem',
							'@media (max-width: 778px)': {
								marginLeft: '4rem'
							},
						}}>Скачать данные</Button>
				</Box>
				<Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
					<Box sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: "24px",
						marginBottom: '35px',
						'@media (max-width: 1335px)': {
							'& > div': {
								width: '18%'
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

					}} >
						<Button
							variant={graphVisibility["CitiesGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("CitiesGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem',
								'@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Cities Graph
						</Button>
						<Button
							variant={graphVisibility["FacultyGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("FacultyGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem', '@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Faculty Graph
						</Button>
						<Button
							variant={graphVisibility["GenderGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("GenderGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem', '@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Gender Graph
						</Button>
						<Button
							variant={graphVisibility["GrantsGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("GrantsGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem', '@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Grants Graph
						</Button>
						<Button
							variant={graphVisibility["CitiesGrantsGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("CitiesGrantsGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem', '@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Cities Grants Graph
						</Button>
						<Button
							variant={graphVisibility["AnalyticsGraph"] ? "contained" : "outlined"}
							onClick={() => toggleGraphVisibility("AnalyticsGraph")}
							sx={{
								borderRadius: '2rem', marginRight: '1rem', '@media (max-width: 778px)': {
									marginBottom: '1rem',
								}
							}}
						>
							Analytics Graph
						</Button>
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
							{graphVisibility["FacultyGraph"] && <FacultyGraph />}
							{graphVisibility["AnalyticsGraph"] && <AnalyticsGraph />}
							{graphVisibility["GenderGraph"] && <GenderGraph />}
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
							{graphVisibility["CitiesGraph"] && <CitiesGraph />}
							{graphVisibility["CitiesGrantsGraph"] && <CitiesGrantsGraph />}
							{graphVisibility["GrantsGraph"] && <GrantsGraph />}
						</Box>
					</Box>

				</Box>
			</TabPanel>
		</Box>
	);
}


export default AnalysisPage;
