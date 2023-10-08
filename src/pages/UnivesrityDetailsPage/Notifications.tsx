import React from "react";
import {
	Box,
	Container,
	Typography,
} from "@mui/material";
import notFile from "./../../assets/icons/IconFile.svg";
import check from "./../../assets/icons/Check.svg";
import settings from "./../../assets/icons/Settings.svg";

const Notifications: React.FC = () => {
	return (
		<Container
			sx={{
				backgroundColor: "white",
				borderRadius: "30px",
				paddingTop: "20px",
				paddingBottom: "25px",
				marginLeft: "10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				width: "100vw",
				maxWidth: "100%",
				marginTop: "10px",
				"@media (max-width: 998px)": {
					alignItems: "flex-start",
					marginTop: "10px",
					width: "95vw",
				},
				"@media (max-width: 778px)": {
					alignItems: "flex-start",
					marginTop: "10px",
					width: "70vw",
				},
			}}
		>
			<Box
				display="flex"
				alignItems="center"
				sx={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
					alignItems: "center",
				}}
			>
				<Typography
					margin="1rem"
					variant="h6"
					sx={{
						fontWeight: "800",
						fontSize: "26px",
						"@media (max-width: 998px)": {
							fontSize: "20px",
						},
					}}
				>
					Уведомление
				</Typography>
				<Box>
					<img src={check} style={{ marginRight: "10px" }} alt="" />
					<img src={settings} alt="" />
				</Box>
			</Box>

			<Box>
				<Box
					sx={{
						marginLeft: "10px",
					}}
				>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 3fr",
							whiteSpace: "nowrap",
							textAlign: "left",
							padding: "0 0 0 0",
						}}
					>
						<Typography
							variant="subtitle1"
							sx={{ color: "#A1A1A1", borderBottom: "1px solid #EBF2FE" }}
						>
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								color: "#A1A1A1",
								borderBottom: "1px solid #EBF2FE",
								"@media (max-width: 778px)": {
									display: "none",
								},
							}}
						>
							Дата
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								color: "#A1A1A1",
								borderBottom: "1px solid #EBF2FE",
								"@media (max-width: 778px)": {
									display: "none",
								},
							}}
						>
							Описание
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 3fr",
						whiteSpace: "nowrap",
						textAlign: "left",
						padding: "18px",
						borderBottom: "1px solid #EBF2FE",
						"@media (max-width: 778px)": {
							display: "flex", // Change to a flex container
							flexDirection: "column", // Display text next to the icon
							alignItems: "center", // Center text and icon vertically
							padding: "8px 8px", // Adjust padding
						},
					}}
				>
					<img src={notFile} alt="" style={{ marginTop: "-10px" }} />

					<Typography
						variant="body1"
						sx={{
							color: "#818181",
							"@media (max-width: 998px)": {
								fontSize: "16px", display: 'flex', flexDirection: 'column'
							},
						}}
					>
						22.08.2023
					</Typography>
					<Typography
						variant="body1"
						sx={{
							fontWeight: "600",
							"@media (max-width: 998px)": {
								fontSize: "14px",
							},
						}}
					>
						Дипломы успешно выпущены<br />
						<Typography
							variant="body1"
							sx={{ color: "#818181", fontSize: "smaller", wordBreak: "break-word" }}
						>
							Дипломы 2023 года “Экономика КБТУ-21-23” успешно выпущены
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};

export default Notifications;
