import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Box, Button, Stack, Paper } from "@mui/material";

const navItems = [
  {
    label: "Dashboard",
    to: "/superadminclient/layout/layringlibrary/librarymanagement",
  },
  {
    label: "Library Form",
    to: "/superadminclient/layout/layringlibrary/librarymanagement/LibraryForm",
  },
  {
    label: "Settings",
    to: "/superadminclient/layout/layringlibrary/librarymanagement/Settings",
  },
];

const LibrarySidebar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
          backgroundColor: "cornflowerblue",
          padding: "8px",
          borderRadius: "30px",
          border: "1px solid black",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              end={item.label === "Dashboard"}
              style={{ textDecoration: "none", flex: 1 }}
            >
              {({ isActive }) => (
                <Button
                  fullWidth
                  sx={{
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? "black" : "white",
                    backgroundColor: isActive ? "white" : "transparent",
                    borderRadius: "30px",
                    textTransform: "none",
                    border: isActive ? "1px solid black" : "none",
                    boxShadow: isActive
                      ? "0px 4px 8px rgba(0,0,0,.2)"
                      : "none",
                    transition: ".3s",
                    "&:hover": {
                      backgroundColor: isActive ? "#f5f5f5" : "#3b6fc4",
                    },
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Stack>
      </Paper>

      <Outlet />
    </Box>
  );
};

export default LibrarySidebar;