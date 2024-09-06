import { Outlet } from "react-router-dom";
import SideBar from "./views/SideBar";
import Header from "./views/Header";

const App = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />    
      <div className="dashboard flex flex-col w-full">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
