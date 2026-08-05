import {
  FaFolder,
  FaCalendarAlt,
  FaBuilding,
  FaBook,
  FaUsers,
  FaTags,
  FaIndustry,
  FaCheckCircle,
  FaLayerGroup,
  FaBoxOpen,
  FaDoorOpen,
  FaGlobe,
  FaArchive,
  FaClone,
} from "react-icons/fa";

import "./SettingsSidebar.css";

const menuIcons = {
  academic_years:   <FaCalendarAlt />,
  editions:         <FaClone />,
  floors:           <FaBuilding />,
  languages:        <FaGlobe />,
  publishers:       <FaBook />,
  racks:            <FaArchive />,
  resource_authors: <FaUsers />,
  resource_statuses:<FaCheckCircle />,
  resource_types:   <FaLayerGroup />,
  resources:        <FaBoxOpen />,
  rooms:            <FaDoorOpen />,
};

const SettingsSidebar = ({
  menuItems,
  selectedMenu,
  onSelect,
}) => {
  return (
    <aside className="settings-sidebar">
      <ul className="settings-menu">
        {menuItems.map((item) => {
          const isActive = selectedMenu?.id === item.id;

          return (
            <li
              key={item.id}
              className={`settings-menu-item ${isActive ? "active" : ""}`}
              onClick={() => onSelect(item)}
            >
              <div className="menu-icon-wrapper">
                <span className="menu-icon">
                  {menuIcons[item.id]}
                </span>
              </div>

              <span className="menu-text">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SettingsSidebar;