import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import LoadingOverlay from "./Components/Common/LoadingOverlay";
import theme from "./Components/Common/theme";

const LibrarySidebar = lazy(() =>
  import("./Components/Library/LibrarySidebar")
);

const Dashboard = lazy(() =>
  import("./Components/Dashborad/Dashboard")
);

const LibraryForm = lazy(() =>
  import("./Components/Library/LibraryForm")
);

// 👇 ADD THIS
const Settings = lazy(() =>
  import("./Components/Library/Settings/Settings")
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>

          <Route
            path="/"
            element={
              <Navigate
                to="/superadminclient/layout/layringlibrary/librarymanagement"
                replace
              />
            }
          />

          <Route
            path="/superadminclient/layout/layringlibrary/librarymanagement"
            element={<LibrarySidebar />}
          >
            <Route index element={<Dashboard />} />
            <Route path="LibraryForm" element={<LibraryForm />} />

            {/* 👇 ADD THIS */}
            <Route path="Settings" element={<Settings />} />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to="/superadminclient/layout/layringlibrary/librarymanagement"
                replace
              />
            }
          />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;