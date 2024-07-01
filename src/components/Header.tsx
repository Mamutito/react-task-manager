import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Button from "./Button";

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center gap-5 justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink p-5 md:py-2">
      <Link to="/dashboard">
        <img src={logo} alt="check sign" className="w-16 drop-shadow-md" />
      </Link>
      <section className="flex">
        <Button text="Add New List Board" secondary />
      </section>
    </header>
  );
};

export default Header;
