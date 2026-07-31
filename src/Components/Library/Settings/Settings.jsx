import { useState } from "react";
import { Box } from "@mui/material";
import SettingsSidebar from "./components/SettingsSidebar";
import MasterTable from "./components/MasterTable";
import "./Settings.css";

const menuItems = [
  { id: "category", label: "Category" },
  { id: "academic_years", label: "Academic Years" },
  { id: "floors", label: "Floors" },
  { id: "publishers", label: "Publishers" },
  { id: "resource_authors", label: "Resource Authors" },
  { id: "resource_categories", label: "Resource Categories" },
  { id: "resource_publishers", label: "Resource Publishers" },
  { id: "resource_statuses", label: "Resource Statuses" },
  { id: "resource_types", label: "Resource Types" },
  { id: "resources", label: "Resources" },
  { id: "rooms", label: "Rooms" },
];

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