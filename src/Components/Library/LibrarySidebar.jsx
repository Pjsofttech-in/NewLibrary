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
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
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
          {navItems.map((item, index) => {
            const isActive =
              location.pathname === item.to ||
              (item.label === "Dashboard" &&
                location.pathname ===
                  "/superadminclient/layout/layringlibrary/librarymanagement");

            return (
              <NavLink
                key={index}
                to={item.to}
                style={{
                  textDecoration: "none",
                  flex: 1,
                }}
              >
                <Button
                  fullWidth
                  sx={{
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: isActive ? "bold" : "normal",
                    textAlign: "center",
                    color: isActive ? "black" : "white",
                    backgroundColor: isActive ? "white" : "transparent",
                    borderRadius: "30px",
                    textTransform: "none",
                    border: isActive ? "1px solid black" : "",
                    boxShadow: isActive
                      ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "#f5f5f5"
                        : "#3b6fc4",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </NavLink>
            );
          })}
        </Stack>
      </Paper>

      <Outlet />
    </Box>
  );
};

export default LibrarySidebar;