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
                                                    "& .MuiSelect-root": {
                                                        minWidth: 120,
                                                        backgroundColor: "transparent", 
                                                        border: "none !important",
                                                        outline: "none !important",
                                                        borderRadius: "4px",
                                                        boxShadow: "none",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                        },
                                                        "& .MuiSelect-icon": {
                                                            color: "#000",
                                                        },
                                                    },
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: "#f5f5f5",
                                                            borderRadius: "8px",
                                                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                                            mt: 1,
                                                        },
                                                    },
                                                }}
                                             >
                                                 <MenuItem value="default" sx={{ fontSize: "14px", color: "#333" }}>Default View</MenuItem>
                                                 <MenuItem value="grid" sx={{ fontSize: "14px", color: "#333" }}>Grid View</MenuItem>
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
