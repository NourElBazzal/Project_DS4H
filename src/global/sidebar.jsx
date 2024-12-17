import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "axios";
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data)

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data, error, isLoading:loading } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const views = data.result.views;

  return (
      <ProSidebar collapsed={collapsed}>
        <SidebarHeader>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <MenuOutlinedIcon
                style={{ cursor: "pointer", fontSize: "24px" }}
                onClick={() => setCollapsed(!collapsed)}
            />
            {!collapsed && (
                <div style={{ marginTop: "10px", fontFamily:"'IBM Plex Sans', sans-serif" }}>
                  <h3 style={{ margin: 0, color: "rgb(48, 109, 173)", fontSize:"30px"}}>I3S</h3>
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