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

// Import your ClubDashboard layout
import Home from './pages/club/Home/index.jsx';
import Leaderboard from './pages/club/Leaderboard/index.jsx';
import ClubLayout from './dashboards/ClubLayout.jsx';

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signin-admin',
        element: <SignInAdmin />,
      },
      {
        path: '/signin-student',
        element: <SignInStudent />,
      },
      {
        path: '/signin-club',
        element: <SignInClub />,
      },
      {
        path: '/signup-admin',
        element: <SignUpAdmin />,
      },
      {
        path: '/signup-student',
        element: <SignUpStudent />,
      },
      {
        path: '/signup-club',
        element: <SignUpClub />,
      },
      {
        path: '/club_dashboard',
        element: <ClubLayout />,
        children: [
          {
            path: '/club_dashboard',
            element: <Home />, // Settings page for club
          },
          {
            path: '/club_dashboard/leaderboard',
            element: <Leaderboard />, // Events management for club
          },
        ],
      },      
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
