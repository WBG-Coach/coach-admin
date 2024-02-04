import { ChakraProvider } from '@chakra-ui/react';
import { lightTheme } from './styles/themes/light';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './contexts/UserContext';
import ReactDOM from 'react-dom/client';
import { Router } from './routes';
import './styles/index.css';
import React from 'react';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/noto-sans';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { NepalFavicon } from './assets/images/logos';

const changeFavicon = () => {
  const link = document.querySelector('link[rel="icon"]');
  if (link && import.meta.env.VITE_COUNTRY === 'np') {
    link.setAttribute('href', NepalFavicon);
    document.title = 'Sikshyak Mentoring';
  }

  if (link && import.meta.env.VITE_COUNTRY === 'sl') {
    document.title = 'Coach SL';
  }
};

changeFavicon();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={lightTheme}>
      <BrowserRouter>
        <UserContextProvider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
