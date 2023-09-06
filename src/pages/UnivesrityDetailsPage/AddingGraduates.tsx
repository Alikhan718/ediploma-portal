import { Box, Typography, LinearProgress, TextField, Button, IconButton, Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const AddingGraduates: React.FC = () => {
	const [progress, setProgress] = useState(0); 
	const [file, setFile] = useState<File | null>(null); 
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

		const uploadedFile = event.target.files?.[0] || null;
		setFile(uploadedFile);
		setProgress(1);
	};
	const goBack = () => {
		if (currentStep > 0) {
			setProgress(currentStep - 1);
		}
	};

	const goForward = () => {
		if (currentStep < steps.length - 1) {
			setProgress(currentStep + 1);
		}
	};

	const handleChooseFileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const steps = ["Upload File", "Step 2", "Step 3", "Step 4"];
	const currentStep = progress;

	return (
		<Box sx={{ textAlign: "center", padding: 16, backgroundColor: "white" }}>

			{/* Progress Bar */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{steps.map((step, index) => (
						<React.Fragment key={index}>
							{index > 0 && (
								<Box
									sx={{
										width: "400px", 
										height: "2px",
										backgroundColor:
											index <= currentStep ? "#3B82F6" : "gray", 
									}}
								/>
							)}
							<Box
								sx={{
									width: 50,
									height: 50,
									borderRadius: "50%",
									backgroundColor:
										index <= currentStep ? "#3B82F6" : "gray", 
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{index + 1}
							</Box>
						</React.Fragment>
					))}
				</Box>
			</Box>
			<Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
				{currentStep > 0 && (
					<IconButton onClick={goBack} color="primary">
						<ArrowBackIcon />
					</IconButton>
				)}
				{currentStep < steps.length - 1 && (
					<IconButton onClick={goForward} color="primary">
						<ArrowForwardIcon />
					</IconButton>
				)}
			</Box>
			{/* File Input */}
			{currentStep === 0 && (

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>

					<Typography variant="h6"> Загрузка Excel Файл</Typography>
					<label
						htmlFor="file-input"
						style={{
							width: "1000px", 
							height: "400px", 
							marginTop: 2,
							borderRadius: "15px",
							border: "3px dashed #3B82F6", 
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
						}}
						onClick={handleChooseFileClick}
					>
						Перетащите ваш Excel файл сюда или{" "}
						<span style={{ textDecoration: "underline", cursor: "pointer" }}>
							выберите с компьютера
						</span>
						<input
							type="file"
							id="file-input"
							accept=".xls, .xlsx"
							onChange={handleFileUpload}
							style={{
								display: "none", 
							}}
							ref={fileInputRef}
						/>
					</label>
				</Box>

			)}
			{currentStep === 1 && file && (
				<Box sx={{ marginTop: 4, backgroundColor: '#FAFBFF' }}>
					<Typography variant="h6">File Information</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography>File Name:</Typography>
							<Typography>{file.name}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>File Size:</Typography>
							<Typography>{(file.size / 1024).toFixed(2)} KB</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>File Status: Uploaded</Typography>
						</Grid>
					</Grid>
				</Box>
			)
			}
			{currentStep === 2 && file && (
				<Box sx={{ marginTop: 4, backgroundColor: '#FAFBFF' }}>
					<Typography variant="h6">File Information</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography>File Name:</Typography>
							<Typography>{file.name}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>File Size:</Typography>
							<Typography>{(file.size / 1024).toFixed(2)} KB</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>File Status: Uploaded</Typography>
						</Grid>
					</Grid>
					<Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '15px' }}> Подписать с ЭЦП</Button>
				</Box>

			)
			}

			{/* Upload Button */}
			{
				currentStep === steps.length - 1 && (
					<Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
						Upload
					</Button>
				)
			}
		</Box >
	);
};

export default AddingGraduates;
