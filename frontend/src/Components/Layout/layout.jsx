import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar /> {/* Navbar stays the same */}
      <div className="container">
        <Outlet /> {/* This will be replaced by the clicked page */}
      </div>
    </>
  );
};

export default Layout;
