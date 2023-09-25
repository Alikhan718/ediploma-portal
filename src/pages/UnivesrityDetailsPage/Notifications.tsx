import React, { useState, useRef } from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import notFile from "./../../assets/icons/IconFile.svg";
import check from "./../../assets/icons/Check.svg";
import settings from "./../../assets/icons/Settings.svg";

const Notifications: React.FC = () => {
	return (
		<Container sx={{
			backgroundColor: 'white',
			borderRadius: '30px',
			paddingTop: '20px',
			paddingBottom: '25px',
			marginLeft: '10px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			width: '100vw', maxWidth: '100%',
		}}><Box display="flex"
			alignItems="center"
			sx={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				width: '100%',
				alignItems: 'center'
			}}>
				<Typography variant="h6" sx={{ fontWeight: '800', fontSize: '26px' }}> Уведомление</Typography>
				<Box><img src={check} style={{ marginRight: '10px' }} alt="" />
					<img src={settings} alt="" /></Box>
			</Box>

			<Box sx={{}}>
				<Box sx={{
					marginLeft: '10px',
				}}>
					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', whiteSpace: 'nowrap', textAlign: 'left', padding: '0 0 0 0' }}>
						<Typography variant="subtitle1" sx={{ color: '#A1A1A1', borderBottom: '1px solid #EBF2FE' }}>
							{/* Text */}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: '#A1A1A1', borderBottom: '1px solid #EBF2FE' }}>
							Дата
						</Typography>
						<Typography variant="subtitle1" sx={{ color: '#A1A1A1', borderBottom: '1px solid #EBF2FE' }}>
							Описание
						</Typography>
					</Box>


					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', whiteSpace: 'nowrap', textAlign: 'left', padding: '18px', borderBottom: '1px solid #EBF2FE' }}>
						<img src={notFile} alt="" style={{ marginTop: '-10px' }} />
						<Typography variant="body1" sx={{ color: '#818181', }}>22.08.2023</Typography>
						<Typography variant="body1" sx={{ fontWeight: '600' }}>
							Дипломы успешно выпущены<br />
							<Typography variant="body1" sx={{ color: '#818181', fontSize: 'smaller' }}>
								Дипломы 2023 года “Экономика КБТУ-21-23” успешно выпущены
							</Typography>
						</Typography>

					</Box>
					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', whiteSpace: 'nowrap', textAlign: 'left', padding: '18px', borderBottom: '1px solid #EBF2FE' }}>
						<img src={notFile} alt="" style={{ marginTop: '-10px' }} />
						<Typography variant="body1" sx={{ color: '#818181', }}>22.08.2023</Typography>
						<Typography variant="body1" sx={{ fontWeight: '600' }}>
							Дипломы успешно выпущены<br />
							<Typography variant="body1" sx={{ color: '#818181', fontSize: 'smaller' }}>
								Дипломы 2023 года “Экономика КБТУ-21-23” успешно выпущены
							</Typography>
						</Typography>
					</Box>
					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', whiteSpace: 'nowrap', textAlign: 'left', padding: '18px', borderBottom: '1px solid #EBF2FE' }}>
						<img src={notFile} alt="" style={{ marginTop: '-10px' }} />
						<Typography variant="body1" sx={{ color: '#818181', }}>22.08.2023</Typography>
						<Typography sx={{ fontWeight: '600' }} >
							Дипломы успешно выпущены<br />
							<Typography variant="body1" sx={{ color: '#818181', fontSize: 'smaller' }}>
								Дипломы 2023 года “Экономика КБТУ-21-23” успешно выпущены
							</Typography>
						</Typography>
					</Box>
					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', whiteSpace: 'nowrap', textAlign: 'left', padding: '18px', borderBottom: '1px solid #EBF2FE' }}>
						<img src={notFile} alt="" style={{ marginTop: '-10px' }} />
						<Typography variant="body1" sx={{ color: '#818181', }}>22.08.2023</Typography>
						<Typography variant="body1" sx={{ fontWeight: '600' }}>Дипломы успещно выпущены
							<Typography variant="body1" sx={{ color: '#818181', fontSize: 'smaller' }}>
								Дипломы 2023 года “Экономика КБТУ-21-23” успешно выпущены
							</Typography></Typography>
					</Box>

				</Box>


			</Box>
		</Container >


	)

}


export default Notifications;