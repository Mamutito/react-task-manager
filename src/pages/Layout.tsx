import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="bg-pattern flex-1 justify-center flex">
        <div className="max-w-screen-2xl flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
