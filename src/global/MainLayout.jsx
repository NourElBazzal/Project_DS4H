import React from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = ({ onViewChange }) => {
  const location = useLocation();

  // Determine if the current path is `/viewer` (GridView page)
  const hideSidebar = location.pathname === "/viewer";

  return (
    <div style={{ display: "flex" }}>
      {/* Conditionally render Sidebar */}
      {!hideSidebar && <Sidebar />}
      <div style={{ flex: 1 }}>
        <Topbar onViewChange={onViewChange} />
        <div style={{ padding: "20px" }}>
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
