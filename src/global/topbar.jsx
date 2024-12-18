import { Box, IconButton, InputBase, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onViewChange }) => {
  const [currentView, setCurrentView] = useState("default");
  const navigate = useNavigate();

  const handleViewChange = (event) => {
    const selectedView = event.target.value;
    setCurrentView(selectedView);
    onViewChange(selectedView);

    // Navigate to the appropriate page
    if (selectedView === "grid") {
      navigate("/viewer");
    } else if (selectedView === "default") {
      navigate("/home");
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor="#ddd" borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

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
    </Box>
  );
};

export default Topbar;
