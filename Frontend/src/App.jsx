import { Outlet } from "react-router-dom";
import SideBar from "./components/SidebarDashboard";
import Header from "./components/HeaderDashboard";

const App = () => {
  return (
    <div>

        <main>
          <Outlet />
        </main>
    </div>
  );
};

export default App;
