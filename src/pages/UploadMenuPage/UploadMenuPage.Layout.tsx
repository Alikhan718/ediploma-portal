import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { UploadMenuPageLayoutProps } from './types';
import { HeaderTitle } from '@src/components/HeaderTitle/HeaderTitle';


export const UploadMenuPageLayout: React.FC<UploadMenuPageLayoutProps> = (props) => {

	const { state, uploadedMenu, uploadMenuLoader, handleChange, onSubmit, step, setStep, validated } = props;
	// const isAviable = !!state.file && !!state.menuName;

	const handleBackClick = (): void => {
		setStep(step - 1);
	};
	const handleNextClick = (): void => {
		setStep(step + 1);
	};
	const Component: { [key: number]: JSX.Element } = {
		1: <Step1
			step={step}
			state={state}
			uploadedMenu={uploadedMenu}
			uploadMenuLoader={uploadMenuLoader}
			handleChange={handleChange}
		/>,
		2: <Step2
			step={step}
			state={state}
			handleChange={handleChange}
		/>,
		3: <Step3
			step={step}
			state={state}
			handleChange={handleChange}
		/>
	};
	return (
		<Box>
			<HeaderTitle
				title="Создание Меню"
				helperText="Для подключения меню необходимо пройти следующий шаг"
				backTo="/app/menu"
			/>
			<Box display="flex" justifyContent="center" alignItems="center" width="100%" height="80vh">
				<div style={{ height: "60%", display: "flex", flexDirection: "column" }}>

					{Component[step]}

					<Button
						type={step > 3 ? "submit" : "button"}
						variant="contained"
						disabled={validated < step || uploadedMenu.length == 0}
						onClick={step > 2 ? onSubmit : handleNextClick}
						style={{ bottom: "0%", marginTop: "auto" }}
						fullWidth
					>
						{step > 2 ? "Сохранить" : "Продолжить"}
					</Button>
					<Button
						type="button"
						variant="outlined"
						fullWidth
						onClick={handleBackClick}
						style={{ display: step > 1 ? "block" : "none", bottom: "0%", marginTop: ".5rem" }} >
						Назад
					</Button>
					<Typography fontSize="16px" marginTop="15px" color="#656665" textAlign="center">
						Шаг {step > 3 ? 3 : step} из 3
					</Typography>

				</div>
			</Box>
		</Box>
	);
};
