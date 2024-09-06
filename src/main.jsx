import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./views/main/Home/index.jsx";
import Leaderboard from "./views/main/Leaderboard/index.jsx";
import Clubs from "./views/main/Clubs/index.jsx";
import Students from "./views/main/Students/index.jsx";
import Messages from "./views/main/Messages/index.jsx";
import Settings from "./views/main/Settings/index.jsx";
import SignOut from "./views/main/SignOut/index.jsx";
import Events from "./views/main/Events/index.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // The default layout
    children: [
      {
        index: true, // Default route, renders Home
        element: <Home />,
      },
      {
        path: "leaderboard", // Leaderboard route
        element: <Leaderboard />,
      },
      {
        path: "clubs", // Clubs route
        element: <Clubs />,
      },
      {
        path: "events", // Events route
        element: <Events />,
      },
      {
        path: "students", // Students route
        element: <Students />,
      },
      {
        path: "messages", // Messages route
        element: <Messages />,
      },
      {
        path: "settings", // Settings route
        element: <Settings />,
      },
      {
        path: "signout", // SignOut route
        element: <SignOut />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
