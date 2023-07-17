import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl   mx-auto w-full">
        <Outlet />
      </div>
    </>
  );
}
