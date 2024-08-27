import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OperationsPage from './OperationsPage';
import CreateCampaign from './CreateCampaign';
import Home from './Home';
import Layout from './Layout';
import './styles/tailwind.css'; // Import Tailwind CSS
import './styles/style.css'; // Import custom CSS
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import BlindInferencePage from './BlindInferencePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/blind-inference',
        element: <BlindInferencePage />,
      },
      {
        path: '/operations',
        element: <OperationsPage />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/createcampaign',
        element: <CreateCampaign />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
