import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingOverlay from "./Components/Common/LoadingOverlay"; // Adjust path if needed
import theme from "./Components/Common/theme";
import { ThemeProvider } from "@mui/material";

const LibrarySidebar = lazy(() =>
  import("./Components/Library/LibrarySidebar")
);
const Dashboard = lazy(() =>
  import("./Components/Dashborad/Dashboard")
);
const LibraryForm = lazy(() =>
  import("./Components/Library/LibraryForm")
);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            <Route
              path="/superadminclient/layout/layringlibrary/librarymanagement"
              element={<LibrarySidebar />}
            >
              <Route index element={<Dashboard />} />
              <Route path="LibraryForm" element={<LibraryForm />} />
            </Route>
          </Routes>
        </Suspense>
    </ThemeProvider>
  );
};

export default App;
