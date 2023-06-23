import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

import './styles/globals.css';
import '@aws-amplify/ui-react/styles.css';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { theme } from './styles/theme';
import awsExports from './aws-exports';
import { store } from './store/store';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter >
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
