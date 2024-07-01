import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="bg-pattern flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
