import React, {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {DashboardLayout, PageContainer} from "@toolpad/core";
import useSWR from "swr";
import axios from "axios";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {Box, MenuItem, Select} from "@mui/material";

const fetcher = url => axios.get(url)

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentView, setCurrentView] = useState(location.pathname.startsWith("/grid") ? "grid" : "default");

    // Determine if the current path is `/viewer` (GridView page)
    const hideSidebar = location.pathname.startsWith("/grid");

    const {
        data,
        error,
        isLoading: loading
    } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);


    const NAVIGATION = !loading && !error ? data.data.result.views.map((view, index) => ({
        kind: 'link',
        title: view.name,
        segment: `information/${index}`,
        icon: <MenuOutlinedIcon/>
    })) : [{
        kind: 'link',
        title: 'Loading...',
        segment: 'home',
        icon: <MenuOutlinedIcon/>
    }];

    const handleViewChange = (event) => {
        const selectedView = event.target.value;
        setCurrentView(selectedView);
        // Navigate to the appropriate page
        if (selectedView === "grid") {
            navigate(`/grid`);
        } else if (selectedView === "default") {
            navigate(`/information/0`);
        }
    };

    return (
        <DashboardLayout navigation={NAVIGATION} hideNavigation={hideSidebar} disableCollapsibleSidebar={hideSidebar}
                         slots={{
                             toolbarActions: () => {
                                 return (
                                     <>
                                         {/* DROPDOWN VIEW SELECTOR */}
                                         <Box display="flex" alignItems="center">
                                             <Select
                                                 value={currentView}
                                                 onChange={handleViewChange}
                                                 sx={{
                                                     minWidth: 120,
                                                     backgroundColor: "#fff",
                                                     borderRadius: "4px",
                                                 }}
                                             >
                                                 <MenuItem value="default">Default View</MenuItem>
                                                 <MenuItem value="grid">Grid View</MenuItem>
                                             </Select>
                                         </Box>
                                     </>
                                 );
                             }
                         }}>
            <PageContainer>
                <Outlet/>
            </PageContainer>
        </DashboardLayout>
    );
};

export default MainLayout;
