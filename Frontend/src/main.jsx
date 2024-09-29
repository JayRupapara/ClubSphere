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

import ClubHome from './pages/club/Home/index.jsx';
import ClubLayout from './dashboards/ClubLayout.jsx';
import ClubMembers from './pages/club/members/index.jsx';
import ClubEvents from './pages/club/Events/index.jsx';
import ClubMessages from './pages/club/Messages/index.jsx';
import ClubSettings from './pages/club/Settings/index.jsx';
import ClubSignOut from './pages/club/SignOut/index.jsx';
import RegisterMember from './pages/club/Home/RegisterMember.jsx';
import SignInMember from './pages/club/Home/SIgnInMember.jsx';

import StudentLayout from './dashboards/StudentLyout.jsx';
import StudentHome from './pages/student/Home/index.jsx';
import StudentLeaderboard from './pages/student/Leaderboard/index.jsx';

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
          { path: '', element: <ClubHome /> },
          { path: 'members', element: <ClubMembers /> },
          { path: 'events', element: <ClubEvents /> },
          { path: 'messages', element: <ClubMessages /> },
          { path: 'settings', element: <ClubSettings /> },
          { path: 'sign_out', element: <ClubSignOut /> },
          { path: 'register', element: <RegisterMember /> }, // Register Member Route
          { path: 'signin', element: <SignInMember /> }, // New Sign-In Route for Club Members
        ],
      },

      {
        path: '/student_dashboard',
        element: <StudentLayout />,
        children: [
          { path: '', element: <StudentHome /> },
          { path: 'leaderboard', element: <StudentLeaderboard /> },
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
