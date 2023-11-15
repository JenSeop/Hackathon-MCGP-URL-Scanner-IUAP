import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    "primary": {
      main: '#3F4659',
    },
    "secondary": {
      main: '#5587E7',
    },
    "third": {
      main: 'white'
    }
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

reportWebVitals();
