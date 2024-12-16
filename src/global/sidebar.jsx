import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import axios from "axios"; // For API requests

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [backendData, setBackendData] = useState(null); // State for backend data

  useEffect(() => {
    // Fetch the data from the backend API
    const fetchBackendData = async () => {
      try {
        const response = await axios.get(
          "http://dronic.i3s.unice.fr:8080/?username=user&password=test"
        );
        setBackendData(response.data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching backend data:", error);
      }
    };

    fetchBackendData(); // Call the function to fetch data
  }, []);

  return (
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <MenuOutlinedIcon
            style={{ cursor: "pointer", fontSize: "24px" }}
            onClick={() => setCollapsed(!collapsed)}
          />
          {!collapsed && (
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ margin: 0, color: "rgb(48, 109, 173)", fontSize: "30px" }}>I3S</h3>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {/* Display the fetched username */}
          {backendData && (
            <MenuItem icon={<AccountCircleOutlinedIcon />}>
              {backendData.username}
            </MenuItem>
          )}

          {/* Display the backend version */}
          {backendData && (
            <MenuItem icon={<InfoOutlinedIcon />}>
              Backend Version: {backendData.backend_version}
            </MenuItem>
          )}

          {/* Dynamically display nodes */}
          {backendData &&
            backendData.nodes &&
            backendData.nodes.map((node, index) => (
              <MenuItem key={index} icon={<DeviceHubOutlinedIcon />}>
                {node.name}
                <Link to={`/node/${node.name}`} /> {/* Create dynamic routes */}
              </MenuItem>
            ))}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div style={{ padding: "20px 10px" }}>
          <h6 style={{ color: "rgb(41, 82, 126)" }}>Footer Content</h6>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
