import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data)

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data, error, isLoading:loading } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { username} = data;
  const version = data["backend version"];
  const views = data.result.views;

  const sidebarStyle = {
    backgroundColor: "#343a40", // Off-white background
    color: "#f8f9fa",
  };

  const contentStyle = {
    padding: "20px",
  };


  return (
      <ProSidebar collapsed={collapsed} style={sidebarStyle}>
        <SidebarHeader>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <MenuOutlinedIcon
                style={{ cursor: "pointer", fontSize: "24px" }}
                onClick={() => setCollapsed(!collapsed)}
            />
            {!collapsed && (
                <div style={{ marginTop: "10px", ...contentStyle}}>
                  <h3 style={{ margin: 0, color: "rgb(48, 109, 173)", fontSize:"30px"}}>I3S</h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  User: {username}
                  <br />
                  Version: {version}
                  </p>
                </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            {views.map((view, index) => (
                <MenuItem key={index} icon={<MenuOutlinedIcon />}>
                  {view.name}
                  <Link to={`/information/${index}`} />
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