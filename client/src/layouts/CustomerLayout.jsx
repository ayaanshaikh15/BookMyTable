import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f2e5d5]">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default CustomerLayout;
