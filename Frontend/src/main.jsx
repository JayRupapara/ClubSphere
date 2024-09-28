import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LandingPage from './pages/LandingPage.jsx';  
import SignInAdmin from './pages/SignInAdmin.jsx';
import SignInStudent from './pages/SignInStudent.jsx';
import SignInClub from './pages/SignInClub.jsx';
import SignUpAdmin from './pages/SignUpAdmin.jsx';
import SignUpStudent from './pages/SignUpStudent.jsx';
import SignUpClub from './pages/SignUpClub.jsx';
import Error404 from './pages/Error404.jsx';

import Home from './pages/club/Home/index.jsx';
import Leaderboard from './pages/club/Leaderboard/index.jsx';
import ClubLayout from './dashboards/ClubLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/signin-admin', element: <SignInAdmin /> },
      { path: '/signin-student', element: <SignInStudent /> },
      { path: '/signin-club', element: <SignInClub /> },
      { path: '/signup-admin', element: <SignUpAdmin /> },
      { path: '/signup-student', element: <SignUpStudent /> },
      { path: '/signup-club', element: <SignUpClub /> },
      {
        path: '/club_dashboard',
        element: <ClubLayout />,
        children: [
          { path: '', element: <Home /> }, // Default Home component for the dashboard
          { path: 'leaderboard', element: <Leaderboard /> },
          // Add other child routes as needed
        ],
      },      
      { path: '*', element: <Error404 /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
