import { useState } from "react";
import { Box } from "@mui/material";
import SettingsSidebar from "./components/SettingsSidebar";
import MasterTable from "./components/MasterTable";
import menuItems from "./config/settingsMenu";
import "./Settings.css";

const Settings = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);

  return (
    <Box className="settings-container">
      {/* Left Hover Sidebar */}
      <SettingsSidebar
        menuItems={menuItems}
        selectedMenu={selectedMenu}
        onSelect={setSelectedMenu}
      />

      {/* Right Content */}
      <Box className="settings-content">
        <MasterTable selectedMenu={selectedMenu} />
      </Box>
    </Box>
  );
};

export default Settings;