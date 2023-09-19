import { Box, Typography, LinearProgress, TextField, Button, IconButton, Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import excel from "./../../assets/icons/File_check.svg";

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
	const fileSizeInKB = file?.size ? Math.round(file.size / 1024) : 0;
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
		<Box sx={{ backgroundColor: "#FAFBFF" }}>
			<Box sx={{ textAlign: "center", padding: 16, backgroundColor: "#FAFBFF", }}>
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
							justifyContent: "center", backgroundColor: '#FAFBFF', paddingBottom: '15px'
						}}
					>
						{steps.map((step, index) => (
							<React.Fragment key={index}>
								{index > 0 && (
									<Box
										sx={{
											width: "300px",
											height: "2px",
											backgroundColor:
												index <= currentStep ? "#3B82F6" : "#F8F8F8",
										}}
									/>
								)}
								<Box
									sx={{
										width: 50,
										height: 50,
										borderRadius: "50%",
										backgroundColor:
											index <= currentStep ? "#3B82F6" : "#F8F8F8",
										color: index <= currentStep ? "white" : "#A1A1A1",
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
				</Box >

				{/* File Input */}
				<Box sx={{
					backgroundColor: 'white', paddingBottom: '30px', borderRadius: '30px'
				}}>
					<Box
						sx={{
							marginTop: 2,
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
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
					{currentStep === 0 && (

						<Box sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}>


							<Typography variant="h6" sx={{ paddingTop: '20px', paddingBottom: '20px' }}> Загрузка Excel Файл</Typography>

							<label
								htmlFor="file-input"
								style={{
									width: "1000px",
									height: "400px",
									marginTop: 2,
									borderRadius: "15px",
									border: "2px dashed #3B82F6",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
								}}
							>
								<img src={excel} style={{ width: '38px', paddingBottom: '15px' }} />
								Перетащите ваш Excel файл сюда или{" "}
								<span style={{ textDecoration: "underline", cursor: "pointer" }}
									onClick={handleChooseFileClick}>
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

							<Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '15px', }}> Скачать шаблон</Button>
							<Box sx={{
								backgroundColor: '#FAFBFF', width: '1000px', paddingTop: '20px', marginTop: '20px', marginBottom: '20px', textAlign: 'left', padding: '20px', borderRadius: '48px'
							}}>
								<Box sx={{ color: '#3B82F6', }}>Примечание</Box>
								<Box sx={{ marginTop: '10px', color: '#A1A1A1' }}> Описание примечание</Box>
							</Box>
						</Box>

					)}

					{currentStep === 1 && file && (
						<Box sx={{ alignItems: 'center', width: '1200px' }}>
							<Typography variant="h6" sx={{ paddingTop: '25px' }}>Проверьте данные на корректность</Typography>

							<Box sx={{
								width: '1100px', borderRadius: '50px',
								height: '300px', backgroundColor: '#FAFBFF', padding: '25px', marginTop: '16px', marginLeft: '70px',
							}}>
								<Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
									<Typography variant="subtitle1" sx={{ marginRight: '300px', color: '#A1A1A1' }}>Название файла:</Typography>
									<Typography variant="subtitle1" sx={{ marginRight: '350px', color: '#A1A1A1' }}>Размер файла:</Typography>
									<Typography variant="subtitle1" sx={{ marginRight: '6px', color: '#A1A1A1' }}>Статус:</Typography>
								</Box>

								<Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
									<Typography variant="body1" sx={{ marginRight: '400px' }}>{file.name}</Typography>
									<Typography variant="body1" sx={{ marginRight: '350px' }}>{fileSizeInKB}KB</Typography>
									<Typography variant="body1">Проверка</Typography>
								</Box>
							</Box>

							<Button variant="contained" color="primary" sx={{ marginTop: '20px', borderRadius: '15px', }}> Проверить</Button>
						</Box>
					)}

					{currentStep === 2 && file && (
						<Box sx={{ marginTop: 4, }}>
							<Typography variant="h6" sx={{}}>Подписать с ЭЦП</Typography>
							<Box sx={{
								width: '1150px', borderRadius: '50px',
								height: '300px', backgroundColor: '#FAFBFF', padding: '25px', marginTop: '16px', marginLeft: '70px',
							}}>
								<Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
									<Typography variant="subtitle1" sx={{ marginRight: '300px', color: '#A1A1A1' }}>Название файла:</Typography>
									<Typography variant="subtitle1" sx={{ marginRight: '350px', color: '#A1A1A1' }}>Размер файла:</Typography>
									<Typography variant="subtitle1" sx={{ marginRight: '6px', color: '#A1A1A1' }}>Статус:</Typography>
								</Box>

								<Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
									<Typography variant="body1" sx={{ marginRight: '400px' }}>{file.name}</Typography>
									<Typography variant="body1" sx={{ marginRight: '350px' }}>{fileSizeInKB}KB</Typography>
									<Typography variant="body1">Проверка</Typography>
								</Box>
							</Box>

							<Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '15px' }}> Подписать с ЭЦП</Button>
						</Box>

					)
					}

					{/* Upload Button */}
					{
						currentStep === 3 && file && (

							<Box>

								<Typography variant="h6" sx={{ paddingTop: '15px' }}> Результаты файла</Typography>
								<Box sx={{
									width: '1150px', borderRadius: '50px',
									height: '300px', backgroundColor: '#FAFBFF', padding: '25px', marginTop: '16px', marginLeft: '70px',
								}}>
									<Box>
										<Typography variant="h3" sx={{ textAlign: 'left', color: '#A1A1A1' }}>Адрес:</Typography>
									</Box>
									<Box
										sx={{
											backgroundColor: 'white',
											padding: '9px',
											marginTop: '6px',
											borderRadius: '50px',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Typography variant="body1" sx={{ fontSize: '16px' }}>
											Ссылка на адрес
										</Typography>
										<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', height: '30px', borderRadius: '32px' }}> Cкопировать</Button>
									</Box>
									<Box>
										<Typography variant="h3" sx={{ textAlign: 'left', paddingTop: '20px', color: '#A1A1A1' }}>Смарт контакт:</Typography>
									</Box>
									<Box
										sx={{
											backgroundColor: 'white',
											padding: '9px',
											marginTop: '6px', borderRadius: '50px', display: 'flex',
											alignItems: 'center',
										}}
									>
										<Typography variant="body1" sx={{ textAlign: 'left', fontSize: '16px' }}>
											Ссылка на смарт контакт
										</Typography>
										<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', height: '30px', borderRadius: '32px' }}> Cкопировать</Button>
									</Box>
								</Box>
								<Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '15px' }}> Подписать с ЭЦП</Button>
							</Box>
						)
					}
				</Box>
			</Box >
		</Box>
	);
};

export default AddingGraduates;
