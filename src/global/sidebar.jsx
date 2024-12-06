import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "axios";  // Importing axios for API requests

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [views, setViews] = useState([]); // State to store the views fetched from the backend

  useEffect(() => {
    // Fetch the views data from the backend API
    const fetchViews = async () => {
      try {
        const response = await axios.get('http://dronic.i3s.unice.fr:8080/?username=user&password=test');
        setViews(response.data.views);  // Set the fetched views into state
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    fetchViews(); // Call the function to fetch views when the component mounts
  }, []); // Empty dependency array to ensure it runs only once after initial render

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
              <h3 style={{ margin: 0, color: "rgb(48, 109, 173)", fontSize:"30px" }}>I3S</h3>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {/* Static Menu Items */}
          <MenuItem icon={<HomeOutlinedIcon />}>
            Dashboard
            <Link to="/" />
          </MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>
            Manage Team
            <Link to="/LoginForm" />
          </MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>
            Contacts
            <Link to="/contacts" />
          </MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>
            Invoices
            <Link to="/invoices" />
          </MenuItem>
          <MenuItem icon={<PersonOutlinedIcon />}>
            Profile
            <Link to="/form" />
          </MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>
            Calendar
            <Link to="/calendar" />
          </MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>
            FAQ
            <Link to="/faq" />
          </MenuItem>
          <MenuItem icon={<BarChartOutlinedIcon />}>
            Bar Chart
            <Link to="/bar" />
          </MenuItem>
          <MenuItem icon={<PieChartOutlineOutlinedIcon />}>
            Pie Chart
            <Link to="/pie" />
          </MenuItem>
          <MenuItem icon={<TimelineOutlinedIcon />}>
            Line Chart
            <Link to="/line" />
          </MenuItem>
          <MenuItem icon={<MapOutlinedIcon />}>
            Geography
            <Link to="/geography" />
          </MenuItem>

          {/* Dynamically generated Menu Items for each view fetched from the backend */}
          {views.map((view, index) => (
            <MenuItem key={index} icon={<HomeOutlinedIcon />}>
              {view.name}
              <Link to={`/view/${view.name}`} /> {/* Create a dynamic route based on the view name */}
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
