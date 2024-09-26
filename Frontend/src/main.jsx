// src/main.jsx
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LandingPage from './pages/LandingPage.jsx';  // Ensure this page exists
import SignInAdmin from './pages/SignInAdmin.jsx';
import SignInStudent from './pages/SignInStudent.jsx';
import SignInClub from './pages/SignInClub.jsx';
import SignUpAdmin from './pages/SignUpAdmin.jsx';
import SignUpStudent from './pages/SignUpStudent.jsx';
import SignUpClub from './pages/SignUpClub.jsx';
import Error404 from './pages/Error404.jsx';

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // App contains Navbar and Outlet for rendering child routes
    children: [
      {
        path: '/', // Default route, the landing page
        element: <LandingPage />,  // Make sure this component is correctly imported and exists
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
        path: '*',
        element: <Error404 />,  // For undefined routes
      },
    ],
  },
]);

// Rendering the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
